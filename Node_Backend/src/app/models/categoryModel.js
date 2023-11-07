const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true,
    },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;