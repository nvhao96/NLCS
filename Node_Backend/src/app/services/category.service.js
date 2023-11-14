const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("Category");
    }

    extractCategoryData(payload) {
        const category = {
            categoryname: payload.categoryname,
        };

        // Remove undefined fields
        Object.keys(category).forEach(
            (key) => (category[key] === undefined && delete category[key])
        );
        return category;
    }



    async create(payload) {
        try {
            const category = this.extractCategoryData(payload); // Trích xuất dữ liệu sản phẩm từ payload
            const result = await this.Category.insertOne(category); // Thêm danh mục vào cơ sở dữ liệu
            return result; // Trả về sản phẩm đã được tạo
        } catch (error) {
            throw new Error("Đã xảy ra lỗi trong quá trình tạo danh mục");
        }
    }



    async findByName(categoryname) {
        const existingCategory = await this.Category.findOne({ categoryname: { $regex: new RegExp(categoryname), $options: "i" } }); //khong phan biet hoa thuong

        if (!existingCategory) {
            return null;
        }
        return existingCategory;
    }

    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }



    async findCategoryById(id) {
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
}



module.exports = CategoryService;