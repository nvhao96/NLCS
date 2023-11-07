const mongoose = require('mongoose');


const userSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        math: /^\S+@\S+\.\S+$/ // Kiểm tra định dạng email
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 8,
            message: 'Password must be at least 8 characters'
        }
    },
    rule: {
        type: Boolean,
        default: false
    }
});




const User = mongoose.model('User', userSchma);

module.exports = User;



