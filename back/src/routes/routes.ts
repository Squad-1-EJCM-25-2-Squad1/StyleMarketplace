import { Router } from 'express';
import { WishlistController } from '../controllers/WishlistController';
import { OrderController } from '../controllers/OrderController';

const router = Router();


// Rotas de Wishlist
router.post('/wishlist', WishlistController.createWishlist);
router.get('/wishlist/user/:user_id', WishlistController.getWishlistByUser);
router.delete('/wishlist/:wishlist_id', WishlistController.deleteWishlist);

// Rotas de Itens da Wishlist
router.post('/wishlist/items', WishlistController.addItemToWishlist);
router.get('/wishlist/:wishlist_id/items', WishlistController.getWishlistItems);
router.delete('/wishlist/:wishlist_id/items/:product_id', WishlistController.removeItemFromWishlist);
router.get('/wishlist/:wishlist_id/items/:product_id/check', WishlistController.checkProductInWishlist);

// Rotas de Order
router.post('/orders', OrderController.createOrder);
router.get('/orders/user/:user_id', OrderController.getOrdersByUser);
router.get('/orders/:order_id', OrderController.getOrderById);
router.put('/orders/:order_id/status', OrderController.updateOrderStatus);
router.post('/orders/:order_id/products', OrderController.addProductToOrder);
router.delete('/orders/:order_id/products/:product_id', OrderController.removeProductFromOrder);
router.get('/orders', OrderController.getAllOrders);

export default router;
