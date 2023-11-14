

class DetailOrderService {
    constructor(client) {
        this.DetailOrder = client.db().collection("ChiTietDatHang");
    }

    extractDetailOrderData(payload) {

        const detailorder = {
            orderId: payload.orderId,
            grandTotalPrice: payload.grandTotalPrice,
            totalPrice: payload.totalPrice,
            ordercartItems: payload.ordercartItems,
            discount: payload.discount || 0,

        };

        Object.keys(detailorder).forEach(
            (key) => (detailorder[key] === undefined && delete detailorder[key])
        );
        return detailorder;
    }


    async create(payload) {
        try {
            console.log("dulieuchitiet", payload);
            const order = this.extractDetailOrderData(payload); // Trích xuất dữ liệu don hang từ payload
            const result = await this.DetailOrder.insertOne(order); // Thêm don hang vào cơ sở dữ liệu
            return result; // Trả về don hang đã được tạo
        } catch (error) {
            throw new Error("An error occurred while creating the detailorder");
        }
    }

    async findByOrderId(id) {
        try {
            const detail = await this.DetailOrder.findOne({ orderId: id }); // Tìm kiếm các hình ảnh có MaHH giống với id
            return detail;
        } catch (error) {
            console.error('Error occurred while finding detailorder:', error);
            throw error;
        }
    }
}

module.exports = DetailOrderService;