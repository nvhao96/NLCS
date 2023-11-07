const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");

router.post("/products", productController.create);
router.get("/products/:id", productController.getById);
router.get("/products", productController.getAll);

module.exports = router;