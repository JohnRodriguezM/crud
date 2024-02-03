import { Product } from "../models/productModel.js";

class ProductsService {
  async getAllProducts() {
    try {
      const products = await Product.find();
      if (!products) {
        throw new Error("No products found");
      }
      return products;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }

  async getProductById(id, next) {
    if (!id) throw new Error("Product id is required");
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error(
          "Product not found, please check the product exists and try again."
        );
      }
      return product;
    } catch (error) {
      next(error);
    }
  }

  async createProduct(productData, next) {
    if (!productData) {
      throw new Error("Product data is required");
    }

    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      next(error);
    }
  }

  async updatedProduct(id, productData, next) {
    if (!id) throw new Error("Product id is required");
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
      });
      return updatedProduct;
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsService };
