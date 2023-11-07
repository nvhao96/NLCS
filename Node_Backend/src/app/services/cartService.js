const Cart = require('../models/cartModel');

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (productId, quantity) => {
    try {
        const existingCartItem = await CartItem.findOne({ productId });

        if (existingCartItem) {
            // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return existingCartItem;
        } else {
            // Sản phẩm chưa có trong giỏ hàng, tạo mới
            const cartItem = new CartItem({ productId, quantity });
            await cartItem.save();
            return cartItem;
        }
    } catch (error) {
        throw error;
    }
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (productId) => {
    try {
        const result = await CartItem.deleteOne({ productId });
        return result;
    } catch (error) {
        throw error;
    }
};

// Tăng số lượng sản phẩm trong giỏ hàng
const increaseQuantity = async (productId, quantity) => {
    try {
        const existingCartItem = await CartItem.findOne({ productId });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return existingCartItem;
        }
    } catch (error) {
        throw error;
    }
};

// Giảm số lượng sản phẩm trong giỏ hàng
const decreaseQuantity = async (productId, quantity) => {
    try {
        const existingCartItem = await CartItem.findOne({ productId });

        if (existingCartItem) {
            if (existingCartItem.quantity > quantity) {
                existingCartItem.quantity -= quantity;
                await existingCartItem.save();
            } else {
                // Nếu số lượng giảm về 0 hoặc âm, xóa sản phẩm khỏi giỏ hàng
                await CartItem.deleteOne({ productId });
            }
            return existingCartItem;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
};
