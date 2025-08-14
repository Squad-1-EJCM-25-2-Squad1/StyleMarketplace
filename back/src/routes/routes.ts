import { Router } from 'express';
import passport from 'passport';
import VariantController from '../controllers/VariantController'; 
import ColorController from '../controllers/ColorController';
import SizeController from '../controllers/SizeController';
import OfferController from '../controllers/OfferController';
import { ProductController } from '../controllers/productController';
import { photoUpload } from '../config/uploader';
import { WishlistController } from '../controllers/WishlistController';
import { OrderController } from '../controllers/OrderController';
import { UserController } from '../controllers/UserController';


const router = Router();
const auth = passport.authenticate("jwt", { session: false });


// Rotas de Wishlist
router.post('/wishlist', WishlistController.createWishlist);
router.get('/wishlist/user/:userId', WishlistController.getWishlistByUser);
router.delete('/wishlist/:userId', WishlistController.deleteWishlist);

// Rotas de Itens da Wishlist
router.post('/wishlist/items', WishlistController.addItemToWishlist);
router.get('/wishlist/:userId/items', WishlistController.getWishlistItems);
router.delete('/wishlist/:userId/items/:product_id', WishlistController.removeItemFromWishlist);
router.get('/wishlist/:userId/items/:product_id/check', WishlistController.checkProductInWishlist);

// Rotas de Order
router.post('/orders', OrderController.createOrder);
router.get('/orders/user/:userId', OrderController.getOrdersByUser);
router.get('/orders/:orderId', OrderController.getOrderById);
router.put('/orders/:orderId/status', OrderController.updateOrderStatus);
router.post('/orders/:orderId/products', OrderController.addProductToOrder);
router.delete('/orders/:orderId/products/:product_id', OrderController.removeProductFromOrder);
router.get('/orders', OrderController.getAllOrders);

// --- Rotas de Variantes ---
router.post("/variant", VariantController.createVariant);
router.get("/variant/:id", VariantController.readVariant);
router.get("/variant", VariantController.readAllVariants);
router.put("/variant/:id", VariantController.updateVariant);
router.delete("/variant/:id", VariantController.deleteVariant);

// --- Rotas de Cores ---
router.post("/color", ColorController.createColor);
router.get("/color/:id", ColorController.readColor);
router.get("/color", ColorController.readAllColors);
router.put("/color/:id", ColorController.updateColor);
router.delete("/color/:id", ColorController.deleteColor);

// --- Rotas de Tamanhos ---
router.post("/size", SizeController.createSize);
router.get("/size/:id", SizeController.readSize);
router.get("/size", SizeController.readAllSizes);
router.put("/size/:id", SizeController.updateSize);
router.delete("/size/:id", SizeController.deleteSize);

// --- Rotas de Ofertas ---
router.post("/offer", OfferController.createOffer);
router.get("/offer/:id", OfferController.readOffer);
router.get("/offer", OfferController.readAllOffers);
router.put("/offer/:id", OfferController.updateOffer);
router.delete("/offer/:id", OfferController.deleteOffer);

// ======= Product

router.post("/product/", ProductController.create);
router.get("/product/", ProductController.readAll);
router.get("/product/:productId", ProductController.readProduct);
router.put("/:productId", ProductController.update);
router.delete("/:productId", ProductController.deleteProduct);

router.post(
  "/:produtoId/image",
  photoUpload.single("image"),
  ProductController.uploadImage
);

// ======= User

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/user", auth, UserController.readUser);
router.get("/user", auth, UserController.updateUser);
router.delete("/user", auth, UserController.deleteUser);

//rota de teste para pegar os IDs, pode ser apagada depois
//router.get("/users", UserController.readAllUsers);

export default router;
