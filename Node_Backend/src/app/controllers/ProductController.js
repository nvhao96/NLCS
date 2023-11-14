const ProductService = require("../services/product.service");
const ImageService = require("../services/image.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

const upload = require('./multer');


exports.createProduct = [upload.single('imageURL'), async (req, res, next) => {

    try {


        if (req.fileValidationError) {
            // xu li loi multer
            return next(new ApiError(400, "Loi khi tai hinh anh len"));
        }


        const { productname, category, price, describe, Quantity, notes } = req.body;
        const imageURL = req.file ? req.file.filename : null; // req.file co ton tai. neu ton tai thi la i



        const productService = new ProductService(MongoDB.client);

        const product = { productname, category, price, describe, Quantity, notes };



        // Tao san pham moi trong "product"
        const document = await productService.create(product);


        const imageService = new ImageService(MongoDB.client);

        if (document) {
            if (imageURL) {
                const HinhHangHoa = {
                    TenHinh: imageURL,
                    MSHH: document.insertedId.toString()
                };
                console.log("HinhHangHoa", HinhHangHoa);

                // Luu thong tin hinh anh vao "HinhHangHoa"

                const ImageProduct = await imageService.create(HinhHangHoa);

            }
            return res.status(200).send({ message: "Thêm sản phẩm thành công" });
        }


    } catch (error) {
        return next(
            new ApiError(500, "Đã xayr ra lỗi khi tạo sản phẩm")
        );
    }
}

];

exports.getAllProducts = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);

        const imageService = new ImageService(MongoDB.client);

        const { productname } = req.query;
        if (productname) {
            documents = await productService.findByName(productname);
        }
        else {
            documents = await productService.find({});
        }

        // Lặp qua mỗi san pham de lay hinh anh tuong ung thong qua id

        for (const product of documents) {
            const images = await imageService.findByMSHH(product._id.toString());
            product.images = images;
        }


        // Tao doi tuong gom thong tin va hinh anh
        const response = {
            documents
        };


        return res.status(200).json(documents);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving products")
        );
    }

};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);

        const imageService = new ImageService(MongoDB.client);


        // Xóa sản phẩm từ bảng "Product"
        const productDeleted = await productService.delete(req.params.id);

        if (productDeleted) {

            // Lấy ID của sản phẩm đã xóa

            // Xóa các ID hình ảnh liên quan đến sản phẩm đã xóa từ bảng "HinhHangHoa"
            const imagesDeleted = await imageService.deleteByMSHH(req.params.id);

            // Kiểm tra xem cả sản phẩm và hình ảnh có được xóa thành công hay không

            if (imagesDeleted) {
                return res.send({ message: "Xóa thành công" });
            } else {
                return next(new ApiError(404, "Không tìm thấy hình ảnh"));
            }
        }

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete product with id=${req.params.id}`
            )
        );
    }

};


exports.updateProduct = [upload.single('imageURL'), async (req, res, next) => {
    try {
        if (req.fileValidationError) {
            // Xu li loi multer neu co
            return next(new ApiError, "Lỗi khi tải ảnh lên");
        }
        const { productname, category, price, Quantity, describe, notes } = req.body;

        // Xu li logic cap nhat san pham
        const productService = new ProductService(MongoDB.client);

        const document = await productService.update(req.params.id, { productname, category, price, Quantity, describe, notes });

        if (!document || !document.value) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm cần cập nhật"));
        }
        else {
            // Cập nhật hình ảnh nếu có hình ảnh được tải lên
            if (req.file) {
                const imageService = new ImageService(MongoDB.client);

                const imageURL = req.file.filename;

                const updateImage = await imageService.updateImage(req.params.id, imageURL);

                if (updateImage) {

                    return res.status(200).send({ status: 200, message: "Cập nhật sản phẩm thành công" });

                } else {
                    return next(new ApiError(404, "Cập nhật thất bại"));
                }

            } else {
                return res.status(200).send({ status: 200, message: "Cập nhật sản phẩm thành công" });

            }

        }
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi cập nhật dữ liệu với id=${req.params.id}`
            )
        )
    }

}
];

exports.findOneProduct = async (req, res, next) => {
    console.log("sản phẩm");
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }


        // Lấy hình ảnh tương ứng với id trong collection HinhHangHoa
        const imageService = new ImageService(MongoDB.client);
        const images = await imageService.findByMSHH(req.params.id);

        // Gắn hình ảnh vào thông tin sản phẩm
        document.images = images;


        return res.status(200).json(document);

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy sản phẩm với id=${req.params.id}`
            )
        );
    }
};




exports.findProductByCategory = async (req, res, next) => {
    try {



        const currentProductId = req.params.product; // Lấy id của sản phẩm hiện tại

        const categoryName = req.params.categoryname;

        const productService = new ProductService(MongoDB.client);

        const imageService = new ImageService(MongoDB.client);

        // Truy vấn CSDL để tìm kiếm sản phẩm theo danh mục



        const objectId = new ObjectId(currentProductId);

        const products = await productService.findCategoryProduct({ $and: [{ category: categoryName, _id: { $ne: objectId } }] });


        if (!products) {
            return res.send({ status: 404, message: "Không tìm thấy các sản phẩm tương tự" })
        }

        // Lặp qua mỗi san pham de lay hinh anh tuong ung thong qua id


        for (const product of products) {
            const images = await imageService.findByMSHH(product._id.toString());
            product.images = images;
        }


        // Tao doi tuong gom thong tin va hinh anh
        const response = {
            products
        };

        console.log("kq", products);


        return res.send(products);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy sản phẩm với id=${req.params.categoryName}`
            )
        );

    }
};

exports.findProductByNotes = async (req, res, next) => {
    let products = [];
    try {



        const note = "Mới";



        const productService = new ProductService(MongoDB.client);

        const imageService = new ImageService(MongoDB.client);

        // Truy vấn CSDL để tìm kiếm sản phẩm theo danh mục




        products = await productService.findCategoryProduct({ notes: note });


        if (!products) {
            return res.send({ status: 404, message: "Không tìm thấy các sản phẩm tương tự" })
        }

        // Lặp qua mỗi san pham de lay hinh anh tuong ung thong qua id


        for (const product of products) {
            const images = await imageService.findByMSHH(product._id.toString());
            product.images = images;
        }


        // Tao doi tuong gom thong tin va hinh anh
        const response = {
            products
        };

        console.log("kq", products);


        return res.send(products);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy sản phẩm`
            )
        );

    }
};


exports.searchProduct = [upload.none(), async (req, res, next) => {
    console.log("search", req.params);
    console.log("search", req.body);

    try {
        const productService = new ProductService(MongoDB.client);
        const imageService = new ImageService(MongoDB.client);

        const { searchProduct } = req.body;

        console.log("product", searchProduct);
        const documents = await productService.findByName(searchProduct);

        if (!documents) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        } else {
            for (const product of documents) {
                const images = await imageService.findByMSHH(product._id.toString());
                product.images = images;
            }


            // Tao doi tuong gom thong tin va hinh anh
            const response = {
                documents
            };


            return res.status(200).json(documents);
        }



    } catch (error) {
        return next(
            new ApiError(500, `Lỗi tìm kiếm sản phẩm`)
        );
    }

}];