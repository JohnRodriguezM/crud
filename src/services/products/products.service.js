import Product from '../../models/products/productModel.js';

class ProductsService {
  async getAllProducts() {
    try {
      const products = await Product.find();
      if (!products) {
        throw new Error('No products found');
      }
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(id, next) {
    if (!id) throw new Error('Product id is required');
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error(
          'Product not found, please check the product exists and try again.',
        );
      }
      return product;
    } catch (error) {
      next(error);
    }
    return null;
  }

  async createProduct(productData) {
    if (!productData || !productData.name) {
      throw new Error('Product data with a name is required');
    }

    const existingProduct = await Product.findOne({ name: productData.name });

    if (existingProduct) {
      throw new Error(`Product with name (${productData.name}) already exists`);
    }

    try {
      return await Product.create(productData);
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  async updatedProduct(id, productData, next) {
    if (!id) throw new Error('Product id is required');
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
      });
      return updatedProduct;
    } catch (error) {
      next(error);
    }
    return null;
  }

  async deleteProduct(id, next) {
    if (!id) {
      throw new Error('Product id is required');
    }

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error(
          'Product not found, please check the product exists and try again.',
        );
      }
      return deletedProduct;
    } catch (error) {
      next(error);
    }
    return null;
  }
}

export default new ProductsService();
