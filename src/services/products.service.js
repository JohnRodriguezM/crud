import { Product } from "../models/productModel.js";


class ProductsService {
  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async createProduct(productData, next) {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      next(error);
      // throw new Error('Failed to create product');
    }
  }
}

export { ProductsService };
/*{
  "name": "John",
  "email": "johnjairorodriguez384@gmail.com"
}*/
