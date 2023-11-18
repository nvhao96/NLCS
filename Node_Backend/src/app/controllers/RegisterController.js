
const UserService = require("../services/user.service");
const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.register = async (req, res, next) => {

    const userService = new UserService(MongoDB.client);
    const emailExits = await userService.findByEmail(req.body.email);
    if (emailExits) {
        return res.status(400).send({ message: "Email đã tồn tại" });

    }

    try {

        const document = await userService.create(req.body);

        return res.status(200).send({ message: "Đăng kí thành công" })

    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi trong quá trình đăng ký tài khoản")
        )
    }





};


exports.registerAdmin = async (req, res, next) => {

    const adminService = new AdminService(MongoDB.client);
    const emailExits = await adminService.findByEmail(req.body.email);
    if (emailExits) {
        return next(new ApiError(400, "Email đã tồn tại!"));
    } else {
        try {

            const document = await adminService.create(req.body);

            if (document) {
                return res.send({ status: 200, message: "Đăng ký thành công" });
            }

        } catch (error) {
            return next(
                new ApiError(500, "Xảy ra lỗi trong quá trình tạo tài khoản")
            )
        }
    }
}








