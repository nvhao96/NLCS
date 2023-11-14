const { ObjectId } = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("user-cart");
    }

    extractCartData(payload) {

        const cartItem = {
            userId: payload.userId,
            productId: payload.productId,
            quantity: payload.quantity,
        };

        Object.keys(cartItem).forEach(
            (key) => (cartItem[key] === undefined && delete cartItem[key])
        );
        return cartItem;
    }

    async addToCart(payload) {
        try {
            const item = this.extractCartData(payload); // Trích xuất dữ liệu sản phẩm từ payload
            const result = await this.Cart.insertOne(item); // Thêm sản phẩm vào cơ sở dữ liệu
            return result; // Trả về sản phẩm đã được tạo
        } catch (error) {
            throw new Error("An error occurred while creating the cart");
        }
    }

    async getCartItem(userId, productId) {
        const cursor = await this.Cart.find({ userId: userId, productId: productId });
        return await cursor.toArray();
    }

    async getCartUser(userId) {
        const cursor = await this.Cart.find({ userId: userId });
        return await cursor.toArray();
    }

    async find(filter) {
        const cursor = await this.Cart.find({ userId: filter });
        return await cursor.toArray();
    }

    async updateCartItemQuantity(userId, productId, updatedQuantity) {
        try {
            console.log("123", userId, productId, updatedQuantity);
            console.log("123", productId);
            console.log("123", updatedQuantity);
            // Thực hiện cập nhật số lượng của sản phẩm trong giỏ hàng của người dùng

            // Tiến hành truy vấn cập nhật dữ liệu trong cơ sở dữ liệu
            const result = await this.Cart.updateOne(
                { userId: userId, productId: productId },
                { $set: { quantity: updatedQuantity } }
            );

            if (result.modifiedCount === 1) {
                // Số lượng đã được cập nhật thành công
                return true;
            } else {
                // Không tìm thấy sản phẩm trong giỏ hàng hoặc không thể cập nhật số lượng
                return false;
            }
        } catch (error) {
            throw new Error('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng');
        }
    }

    async delete(userId, productId) {
        const result = await this.Cart.findOneAndDelete({
            userId: userId,
            productId: productId
        });
        return result;
    }

    async deleteAll(userId) {
        const result = await this.Cart.deleteMany({
            userId: userId
        });
        return result;
    }



}

module.exports = CartService;