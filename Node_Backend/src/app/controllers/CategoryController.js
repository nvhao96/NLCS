const ImageService = require("../services/image.service");
const CategoryService = require("../services/category.service");
const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const upload = require('./multer');

exports.createCategory = [upload.none(), async (req, res, next) => {
    const categoryname = req.body.categoryname;

    const categoryService = new CategoryService(MongoDB.client);

    const categoryExits = await categoryService.findByName(categoryname);
    if (categoryExits) {
        return next(
            new ApiError(400, "Tên danh mục đã tồn tại")
        )
    } else {
        try {

            const document = await categoryService.create({ categoryname });

            if (!document) {
                return next(
                    new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo danh mục")
                )

            } else {
                return res.send({ status: 200, message: "Tạo danh mục mới thành công" })
            }

        } catch (error) {
            return next(
                new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo danh mục")
            )
        }
    }
}
];

exports.getNameCategorys = async (req, res, next) => {

    let documents = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const { categoryname } = req.query;
        if (categoryname) {
            documents = await categoryService.findByName(categoryname);
        }
        else {
            documents = await categoryService.find({});
        }

        return res.status(200).json(documents);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving categorys")
        );
    }

};


exports.findProduct = async (req, res, next) => {
    try {
        // truy cập id tren duong dan 
        console.log("gui", req.params.id);

        const categoryId = req.params.id;

        if (!categoryId) {
            return res.json({ status400, message: "Missing categoryId" });
        }

        const categoryService = new CategoryService(MongoDB.client);
        const category = await categoryService.findCategoryById(categoryId);
        if (!category) {
            return res.send({ status: 404, message: "Không tìm thấy danh mục" });
        }

        const categoryName = category.categoryname;



        const productService = new ProductService(MongoDB.client);
        const documents = await productService.findByCategoryName(categoryName);

        if (!documents) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }

        for (const document of documents) {
            console.log("document id:", document._id);

            const productId = document._id.toString();

            // Lấy hình ảnh tương ứng với id trong collection HinhHangHoa
            const imageService = new ImageService(MongoDB.client);
            const images = await imageService.findByMSHH(productId);

            // Gắn hình ảnh vào thông tin sản phẩm
            document.images = images;
        }

        return res.status(200).json(documents);

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy sản phẩm với id=${req.params.id}`
            )
        );
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const categories = await categoryService.find({});
        return res.status(200).json(categories);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while retrieving categories')
        );
    }
};