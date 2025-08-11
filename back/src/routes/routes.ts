import { Router } from 'express';
import VariantController from '../controllers/VariantController'; 
import ColorController from '../controllers/ColorController';
import SizeController from '../controllers/SizeController';
import OfferController from '../controllers/OfferController';

const router = Router();

// --- Rotas de Variantes ---
router.post('/variant', VariantController.createVariant);
router.get('/variant/:id', VariantController.readVariant);
router.get('/variant', VariantController.readAllVariants); 
router.put('/variant/:id', VariantController.updateVariant);
router.delete('/variant/:id', VariantController.deleteVariant);

// --- Rotas de Cores ---
router.post('/color', ColorController.createColor);
router.get('/color/:id', ColorController.readColor);
router.get('/color', ColorController.readAllColors); 
router.put('/color/:id', ColorController.updateColor);
router.delete('/color/:id', ColorController.deleteColor);

// --- Rotas de Tamanhos ---
router.post('/size', SizeController.createSize);
router.get('/size/:id', SizeController.readSize);
router.get('/size', SizeController.readAllSizes); 
router.put('/size/:id', SizeController.updateSize);
router.delete('/size/:id', SizeController.deleteSize);

// --- Rotas de Ofertas ---
router.post('/offer', OfferController.createOffer);
router.get('/offer/:id', OfferController.readOffer);
router.get('/offer', OfferController.readAllOffers); 
router.put('/offer/:id', OfferController.updateOffer);
router.delete('/offer/:id', OfferController.deleteOffer);

export default router; 