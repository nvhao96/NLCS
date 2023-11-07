
const MongoDB = require("../utils/mongodb.util");

const ProductService = require("../services/productService");

class ProductController {
    async create(req, res) {
        try {
            const { productName, category, price, description } = req.body;
            const productService = new ProductService(MongoDB.client)
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProductController();