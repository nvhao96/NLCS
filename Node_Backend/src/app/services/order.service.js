const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("DatHang");
    }

    extractOrderData(payload) {

        const order = {
            userId: payload.userId,
            dateDH: payload.dateDH,
            phone: payload.phone,
            address: payload.address,
            fullname: payload.fullname,
            paymentMethod: payload.paymentMethod,
            dateGH: payload.dateGH || '', // Sử dụng giá trị từ trường dateGH, nếu không có, sẽ lưu giá trị rỗng ('')
            adminId: payload.adminId || '',
            status: payload.status || 'Chờ xử lí' // Trạng thái mặc định là 'Chờ xử lí' nếu không có trạng thái được cung cấp

        };

        Object.keys(order).forEach(
            (key) => (order[key] === undefined && delete order[key])
        );
        return order;
    }


    async create(payload) {
        console.log("dulieudathang", payload);
        try {
            const order = this.extractOrderData(payload); // Trích xuất dữ liệu don hang từ payload
            const result = await this.Order.insertOne(order); // Thêm don hang vào cơ sở dữ liệu
            return result; // Trả về don hang đã được tạo
        } catch (error) {
            throw new Error("An error occurred while creating the order");
        }
    }

    async update(id, payload) {
        console.log("capnhatid", id);
        console.log("data", payload);

        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderData(payload);

        // Thêm trường status với giá trị "Đã giao" vào đối tượng update
        update.status = "Đã giao";

        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;

    }

    async findByOrderId(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    async findByUserId(userId) {


        const result = await this.Order.find({ userId: userId }).toArray();
        return result;
    }
}

module.exports = OrderService;