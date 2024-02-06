import { Router } from 'express';
import { createProduct, editProduct, getAllProducts } from '../../controllers/products/products.controller.js';

// ? import controllers

const router = Router();

//* GET /products
router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', editProduct);
// router.delete("/:id", deleteProduct);

export default router;
