// const cartService = require("../services/cartService");
// const MongoDB = require("../utils/mongodb.util");

// // Thêm sản phẩm vào giỏ hàng
// class cartController{
//     async addToCart = (req, res) {
//         try {
//             const { userId, productId, quantity } = req.body;
//             const cartItem = await cartService.addToCart(userId, productId, quantity);
//             res.json(cartItem);
//         } catch (error) {
//             res.status(500).json({ error: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
//         }
//     };


//     // Xóa sản phẩm khỏi giỏ hàng
//     async removeFromCart =  (req, res)  {
//         try {
//             const { userId, productId } = req.params;
//             const result = await cartService.removeFromCart(userId, productId);
//             res.json({ message: 'Xóa sản phẩm thành công' });
//         } catch (error) {
//             res.status(500).json({ error: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng' });
//         }
//     };

//     // Tăng số lượng sản phẩm trong giỏ hàng
//     const increaseQuantity = async (req, res) => {
//         const { userId, productId, quantity } = req.body;
//         try {
//             const cartItem = await cartService.increaseQuantity(userId, productId, quantity);
//             res.json(cartItem);
//         } catch (error) {
//             res.status(500).json({ error: 'Lỗi khi tăng số lượng sản phẩm trong giỏ hàng' });
//         }
//     };

//     // Giảm số lượng sản phẩm trong giỏ hàng
//     const decreaseQuantity = async (req, res) => {
//         const { userId, productId, quantity } = req.body;
//         try {
//             const cartItem = await cartService.decreaseQuantity(userId, productId, quantity);
//             res.json(cartItem);
//         } catch (error) {
//             res.status(500).json({ error: 'Lỗi khi giảm số lượng sản phẩm trong giỏ hàng' });
//         }
//     };
// };


// module.exports = {
//     addToCart,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
// };







const Cart = require('../services/cartService');

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingItemIndex !== -1) {
            // Item already exists in the cart, update the quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Item doesn't exist in the cart, add it
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const updatedItems = cart.items.filter(
            (item) => item._id.toString() !== itemId
        );

        cart.items = updatedItems;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};