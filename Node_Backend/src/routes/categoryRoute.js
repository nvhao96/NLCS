const express = require("express");
const router = express.Router();
const categoryController = require("../app/controllers/CategoryController");

router.post("/categories", categoryController.create);
router.get("/categories/:id", categoryController.getById);
router.get("/categories", categoryController.getAll);

module.exports = router;