const ImageService = require("../services/image.service");
const OrderService = require("../services/order.service");
const DetailOrderService = require("../services/detailorder.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

const upload = require('./multer');



exports.createOrder = [upload.none(), async (req, res, next) => {
    console.log("donhang", req.body);
    try {
        const { userId, dateDH, grandTotalPrice, totalPrice, fullname, address, phone, paymentMethod, ordercartItems } = req.body;
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create({ userId, dateDH, fullname, address, phone, paymentMethod });

        console.log("dánhach", ordercartItems);

        const detailorderService = new DetailOrderService(MongoDB.client);

        if (document) {
            const orderData = {
                orderId: document.insertedId.toString(),
                grandTotalPrice: parseInt(grandTotalPrice.replace(/\./g, '')),

                totalPrice: parseInt(totalPrice.replace(/\./g, '')),


                ordercartItems: ordercartItems,

            }
            console.log("chitiet", orderData);

            const detailOrderData = await detailorderService.create(orderData);
            if (detailOrderData) {
                return res.send({ status: 200, message: "Tạo chi tiết đơn hàng thành công" });
            }

        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo đơn hàng")
        );
    }
}];

exports.updateOrder = [upload.none(), async (req, res, next) => {
    console.log("updateorder", req.body);

    try {
        const orderId = req.params.idorder;

        console.log("idcapnhat", orderId);

        const orderService = new OrderService(MongoDB.client);
        // khi thuc thi lenh thu 2 document thi du lieu da duoc update

        const document = await orderService.update(orderId, req.body);

        if (!document) {
            return next(new ApiError(404, "Không tìm thấy đặt hàng"));
        }
        return res.json({ status: 200, message: "Cập nhật thông tin đặt hàng thành công!" });

    } catch (error) {
        return next(
            new ApiError(500, `Lỗi cập nhật đặt hàng với id=${req.params.id}`)
        );
    }
}
];

exports.getAllOrders = async (req, res, next) => {
    try {
        let orders = [];

        const result = [];

        const orderService = new OrderService(MongoDB.client);

        orders = await orderService.find({});

        console.log("order", orders);

        if (!orders) {
            return res.send({ status: 404, message: "Không tìm thấy dat hang" });
        }

        for (const order of orders) {
            const orderId = order._id.toString();

            console.log("detailorderId", orderId);

            const detailorderService = new DetailOrderService(MongoDB.client);
            const details = await detailorderService.findByOrderId(orderId);

            if (!details) {
                return next(new ApiError(404, "Không tìm thấy chi tiết đặt hàng"));
            }

            result.push({ order, details })
            console.log("result", result);

        }


        return res.send(result);


    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy chi tiết đặt hàng`
            )
        );
    }
};


exports.findOneOrder = async (req, res, next) => {
    try {
        let orders = [];

        const result = [];

        const userId = req.params.idorder;

        console.log("user", userId);

        const orderService = new OrderService(MongoDB.client);

        orders = await orderService.findByUserId(userId);

        console.log("order", orders);

        if (!orders) {
            return res.send({ status: 404, message: "Không tìm thấy dat hang" });
        }

        for (const order of orders) {
            const orderId = order._id.toString();

            console.log("detailorderId", orderId);

            const detailorderService = new DetailOrderService(MongoDB.client);
            const details = await detailorderService.findByOrderId(orderId);

            if (!details) {
                return next(new ApiError(404, "Không tìm thấy chi tiết đặt hàng"));
            }

            result.push({ order, details })
            console.log("result", result);

        }


        return res.send(result);


    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi lấy chi tiết đặt hàng`
            )
        );
    }
};