const CategoryService = require("../services/categoryService");

class CategoryController {
    async create(req, res, next) {
        try {
            const { name } = req.body;

            const categoryService = new CategoryService();
            const createdCategory = await categoryService.createCategory(name);

            res.json(createdCategory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const categoryService = new CategoryService();
            const category = await categoryService.getCategoryById(id);

            if (!category) {
                res.status(404).json({ message: "Category not found" });
            }

            res.json(category);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }

    async getAll(req, res, next) {
        try {
            const categoryService = new CategoryService();
            const categories = await categoryService.getAllCategories();

            res.json(categories);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
}

module.exports = new CategoryController();