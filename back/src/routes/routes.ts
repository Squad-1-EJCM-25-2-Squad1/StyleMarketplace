import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { photoUpload } from '../config/uploader';

const router = Router();

router.post('/', ProductController.create);
router.get('/', ProductController.readAll);
router.get('/:productId', ProductController.readProduct);
router.put('/:productId', ProductController.update);
router.delete('/:productId', ProductController.deleteProduct);

router.post('/:produtoId/image', photoUpload.single('image'), ProductController.uploadImage);

export default router;
