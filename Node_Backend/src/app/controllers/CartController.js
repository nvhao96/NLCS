const CartService = require("../services/cart.service");
const ProductService = require("../services/product.service");
const ImageService = require("../services/image.service");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");
const upload = require('./multer');


exports.addToCart = [upload.none(), async (req, res, next) => {
    try {
        const { productId, quantity, userId } = req.body;

        const cartService = new CartService(MongoDB.client);

        // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng của người dùng
        const existingCartItem = await cartService.getCartItem(userId, productId);
        if (existingCartItem && existingCartItem.length > 0) {
            console.log("san pham ton tai");
            // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
            const existingQuantity = parseInt(existingCartItem[0].quantity);
            const updatedQuantity = existingQuantity + parseInt(quantity);
            await cartService.updateCartItemQuantity(userId, productId, updatedQuantity);

            return res.send({ status: 200, message: "Thêm sản phẩm mới và cập nhật số lượng" });
        } else {
            console.log("san pham moi");
            // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
            const newCartItem = {
                productId: productId,
                quantity: quantity,
                userId: userId
            };
            const result = await cartService.addToCart(newCartItem); // Gọi lại phương thức addToCart
            if (result) {
                return res.send({ status: 200, message: "Thêm sản phẩm mới thành công" });
            }
        }

    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi thêm vào giỏ hàng")
        );
    }
}];

exports.getCart = async (req, res, next) => {

    try {
        let documents = [];
        const userId = req.params.userId;
        const cartService = new CartService(MongoDB.client);
        documents = await cartService.find(userId);
        if (!documents) {
            return next(new ApiError(404, "Không tìm thấy người dùng"));
        } else {
            const productIds = [];
            const cartItems = [];

            // Lấy danh sách các productId từ giỏ hàng và tạo danh sách cartItems
            for (const item of documents) {
                productIds.push(item.productId);
                const productService = new ProductService(MongoDB.client);
                const product = await productService.findById(item.productId);
                const imageService = new ImageService(MongoDB.client);
                const images = await imageService.findByMSHH(item.productId);
                const productImages = images;

                cartItems.push({
                    productId: item.productId,
                    productname: product.productname,
                    price: product.price,
                    category: product.category,
                    images: productImages,
                    quantity: item.quantity
                });
            }

            documents = cartItems;
            // console.log("document", documents);

            return res.send(documents);
        }
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy giỏ hàng của người dùng với id=${req.params.id}`
            )
        );
    }


};


exports.deleteCart = async (req, res, next) => {

    try {

        const { userId, productId } = req.params;

        const cartService = new CartService(MongoDB.client);

        // Kiểm tra nếu sản phẩm có tồn tại trong giỏ hàng của người dùng
        const existingCartItem = await cartService.getCartItem(userId, productId);


        if (!existingCartItem) {
            throw new Error('Sản phẩm không tồn tại trong giỏ hàng');
        } else {

            const result = await cartService.delete(userId, productId); // Gọi lại phương thức addToCart
            if (result) {
                return res.send({ status: 200, message: "Xóa sản phẩm ra khỏi giỏ hàng thành công" });
            }
        }

    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa sản phẩm trong giỏ hàng")
        );
    }
};

exports.updateCart = [upload.none(), async (req, res, next) => {
    console.log("data", req.body.data);
    console.log("userId", req.params.productId);
    console.log("userId", req.params.userId);

    try {
        const productId = req.params.productId;

        const userId = req.params.userId;

        // const { userId, productId } = req.params;
        const quantity = parseInt(req.body.data);
        console.log("quantity", quantity);
        console.log("userId", userId);

        const cartService = new CartService(MongoDB.client);

        // Kiểm tra nếu sản phẩm có tồn tại trong giỏ hàng của người dùng


        const result = await cartService.updateCartItemQuantity(userId, productId, quantity); // Gọi lại phương thức addToCart
        if (result) {
            return res.send({ status: 200, message: "Cập nhật thành công" });
        }



    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi cập nhật sản phẩm trong giỏ hàng")
        );
    }
}];


exports.deleteAllCart = async (req, res, next) => {
    try {

        const { userId } = req.params;
        console.log("userId", userId);

        const cartService = new CartService(MongoDB.client);

        // Kiểm tra nếu sản phẩm có tồn tại trong giỏ hàng của người dùng
        const existingCartItem = await cartService.getCartUser(userId);


        if (!existingCartItem) {
            throw new Error('Sản phẩm không tồn tại trong giỏ hàng');
        } else {

            const result = await cartService.deleteAll(userId); // Gọi lại phương thức addToCart
            if (result) {
                return res.send({ status: 200, message: "Xóa sản phẩm ra khỏi giỏ hàng thành công" });
            }
        }

    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa sản phẩm trong giỏ hàng")
        );
    }
};