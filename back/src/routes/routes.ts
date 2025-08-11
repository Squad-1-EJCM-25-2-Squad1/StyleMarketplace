import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { photoUpload } from '../config/uploader';

const router = Router();

// ======= Product

router.post('/', ProductController.create);
router.get('/', ProductController.readAll);
router.get('/:productId', ProductController.readProduct);
router.put('/:productId', ProductController.update);
router.delete('/:productId', ProductController.deleteProduct);

router.post('/:produtoId/image', photoUpload.single('image'), ProductController.uploadImage);

// ======= User

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/user/:userId', UserController.readUser);
router.get('/user/:userId', UserController.updateUser);
router.delete('/user/:userId', UserController.deleteUser);

//rota de teste para pegar os IDs, pode ser apagada depois
//router.get("/users", UserController.readAllUsers);


export default router;
