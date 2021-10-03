const saleService = require("../Services/SalesService");

class SalesController {
  static async createSale(req, res) {
    await saleService.createSale(req, res);
  }

  static async getSale(req, res) {
    await saleService.getSale(req, res);
  }

  static async getAllSales(req, res) {
    await saleService.getAllSales(req, res);
  }

  static async getSaleProducts(req, res) {
    await saleService.getSaleProducts(req, res);
  }

  static async getAllSalesProducts(req, res) {
    await saleService.getAllSalesProducts(req, res);
  }

  static async updateSale(req, res) {
    await saleService.updateSale(req, res);
  }

  static async deleteSale(req, res) {
    await saleService.deleteSale(req, res);
  }
}

module.exports = SalesController;
