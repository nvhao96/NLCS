const express = require("express");
const router = express.Router();
const categorys = require("../app/controllers/CategoryController");

router.route('/')
    .post(categorys.createCategory)
    .get(categorys.getAllCategories);

router.route('/:id')
    .get(categorys.findProduct);

module.exports = router;