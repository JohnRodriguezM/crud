import { validationResult } from "express-validator";
import { ProductsService } from "../services/products.service.js";
import productValidationRules from "./validations/products.validations.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = new ProductsService();
    const allProducts = await products.getAllProducts();

    // ? It allows me to return an error and simulate a 500 status code, to show to user the error message in a good way
    /*if (Array.isArray(allProducts) && allProducts.length === 0) {
     throw new Error("No se han encontrado productos");
    }
*/
    if (Array.isArray(allProducts) && allProducts.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No se han encontrado productos",
        data: allProducts || [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Se han obtenido todos los productos exitosamente",
      data: allProducts,
    });
  } catch (err) {
    next(err);
  }
};
const createProduct = [
  ...productValidationRules,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors occurred",
        detail: errors.array()[0].msg,
      });
    }

    try {
      const products = new ProductsService();
      const newProduct = await products.createProduct(req.body, next);

      res.status(201).json({
        success: true,
        message: "El producto ha sido creado exitosamente",
        data: newProduct,
      });
    } catch (err) {
      next(err);
    }
  },
];

export {
  // list as getAllProducts,
  getAllProducts,
  // create as createProduct,
  createProduct,
};
