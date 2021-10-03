const { Router } = require("express");
const productRoutes = require("./ProductRoutes");
const saleRoutes = require("./SaleRoutes");

const router = Router();

router.get("/", (req, res) => {
  res.send("Rotas OK");
});

router.use("/product", productRoutes);
router.use("/sale", saleRoutes);

module.exports = router;
