const Product = require("../models/productModel");
// // const MongoClient = require('mongodb').MongoClient;
// const db = require('../config/index');
const { ObjectId } = require("mongodb");


class ProductService {
    constructor(client) {
        this.Product = client.db().collection("product");
    }
    extractProductData(payload) {
        const product = {
            productName: payload.productName,
            category: payload.category,
            price: payload.price,
            description: payload.description,
            quantity: payload.quantity,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }
    async createProduct(payload) {
        const product = this.extractProductData(payload);

        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: product },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // async createProduct(name, price, description) {
    //     try {
    //         const product = new Product({ name, price, description });
    //         console.log(product);
    //         await product.save();
    //         return product;
    //     } catch (error) {
    //         throw new Error("Failed to create product");
    //     }
    // }

    // async createProduct(name, price, description) {
    //     const contact = this.extractConactData(payload);
    //     const result = await this.Contact.findOneAndUpdate(
    //         contact,
    //         { $set: { favorite: contact.favorite === true } },
    //         { returnDocument: "after", upsert: true }
    //     );
    //     return result;
    // }

    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw new Error("Failed to get product");
        }
    }

    async getAllProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error("Failed to get products");
        }
    }
}

module.exports = ProductService;