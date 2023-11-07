const Category = require("../models/categoryModel");
const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("category");
    }
    extractCategoryData(payload) {
        const categogy = {
            categogyname: payload.categogyname,

        };
        // Remove undefined fields
        Objects.keys(categogy).forEach(
            (key) => categogy[key] === undefined && delete categogy[key]
        );
        return categogy;
    }
    async createCategory(name) {
        try {
            const newCategory = new Category({ name });
            const createdCategory = await newCategory.save();
            return createdCategory;
        } catch (error) {
            throw error;
        }
    }

    async getCategoryById(id) {
        try {
            const category = await Category.findById(id);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const categories = await Category.find();
            return categories;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryService;