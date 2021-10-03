const { Router } = require("express");
const isNumberMiddleware = require("../Middlewares/isNumberMiddleware");
const ProductController = require("../Controllers/ProductsController");

const router = Router();

router
  .route("/")
  .get(ProductController.getAllProducts)
  .post(ProductController.createProduct);

router.get("/available", ProductController.getSellableProduct);

router
  .route("/:id")
  .get(isNumberMiddleware, ProductController.getProduct)
  .put(isNumberMiddleware, ProductController.updateProduct)
  .delete(isNumberMiddleware, ProductController.deleteProduct);

module.exports = router;
