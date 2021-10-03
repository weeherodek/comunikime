const productsService = require("../Services/ProductsService");

class ProductController {
  static async createProduct(req, res) {
    await productsService.createProduct(req, res);
  }

  static async getProduct(req, res) {
    await productsService.getProduct(req, res);
  }

  static async getAllProducts(req, res) {
    await productsService.getAllProducts(res, res);
  }

  static async getSellableProduct(req, res) {
    await productsService.getSellableProduct(req, res);
  }

  static async updateProduct(req, res) {
    await productsService.updateProduct(req, res);
  }

  static async deleteProduct(req, res) {
    await productsService.deleteProduct(req, res);
  }
}

module.exports = ProductController;
