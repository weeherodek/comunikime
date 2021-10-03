const { Router } = require("express");
const SalesController = require("../Controllers/SalesController");
const isNumberMiddleware = require("../Middlewares/isNumberMiddleware");

const router = Router();

router
  .route("/")
  .get(SalesController.getAllSales)
  .post(SalesController.createSale);

router.get("/products", SalesController.getAllSalesProducts);

router
  .route("/:id/products")
  .get(isNumberMiddleware, SalesController.getSaleProducts);

router
  .route("/:id")
  .get(isNumberMiddleware, SalesController.getSale)
  .put(isNumberMiddleware, SalesController.updateSale)
  .delete(isNumberMiddleware, SalesController.deleteSale);

module.exports = router;
