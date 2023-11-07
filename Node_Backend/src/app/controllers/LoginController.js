const UserService = require("../services/userService");
const User = require("../models/userModel");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");
const MongoDB = require("../util/mongodb");

class LoginController {
    async login(req, res, next) {
        try {
            const { phone, password } = req.body;

            const userService = new UserService(MongoDB.client);

            const user = await userService.findByPhone(phone);

            if (!user) {
                return next(new ApiError(404, "User not found"));
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return next(new ApiError(401, "Invalid password"));
            }

            // Login successful
            res.send("Logged in successfully");
        } catch (err) {
            console.log(err);
            return next(new ApiError(500, "An error occurred while logging in"));
        }
    }
}

module.exports = new LoginController();

