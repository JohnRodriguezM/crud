import { validationResult } from 'express-validator';
import { productValidationRules, productUpdateValidationRules } from './validators/products.validations.js';
import products from '../../services/products/products.service.js';

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      detail: errors.array()[0].msg,
    });
  }
  return null;
};

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await products.getAllProducts();

    if (Array.isArray(allProducts) && allProducts.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No se han encontrado productos',
        data: allProducts || [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Se han obtenido todos los productos exitosamente',
      data: allProducts,
    });
  } catch (err) {
    next(err);
  }
  return null;
};

const createProduct = [
  ...productUpdateValidationRules,
  async (req, res, next) => {
    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return errorResponse;

    try {
      const newProduct = await products.createProduct(req.body, next);

      res.status(201).json({
        success: true,
        message: 'El producto ha sido creado exitosamente',
        data: newProduct,
      });
    } catch (err) {
      next(err);
    }
    return null;
  },
];

const editProduct = [
  ...productValidationRules,
  async (req, res, next) => {
    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return errorResponse;

    try {
      const updatedProduct = await products.updateProduct(
        req.params.id,
        req.body,
        next,
      );
      res.status(200).json({
        success: true,
        message: 'El producto ha sido actualizado exitosamente',
        data: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
    return null;
  },
];

export {
  getAllProducts,
  createProduct,
  editProduct,
};
