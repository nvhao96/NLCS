const UserService = require("../services/user.service");
const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const jwt = require('jsonwebtoken');


exports.login = async (req, res, next) => {
    const userService = new UserService(MongoDB.client);
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);



    if (!user) {
        return next(new ApiError(404, "Tài khoản không tồn tại"));
    } else {

        const isPasswordValid = await userService.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return next(new ApiError(400, "Đăng nhập không thành công, bạn đã nhập sai mật khẩu! Vui lòng đăng nhập lại."));
        }


        // Tạo payload cho JWT
        const payload = {
            fullname: user.fullname,
            email: user.email,
            id: user._id,
            role: user.role

        };

        // Tạo JWT
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });


        return res.status(200).send({ message: "Dang nhap thanh cong", token, payload })
    }

}


exports.loginAdmin = async (req, res, next) => {
    const adminService = new AdminService(MongoDB.client);
    const { email, password } = req.body;
    console.log(req.body);

    const admin = await adminService.findByEmail(email);


    if (!admin) {
        return next(new ApiError(404, "Tài khoản không tồn tại"));
    } else {
        const isPasswordValid = await adminService.comparePassword(password, admin.password);

        if (isPasswordValid === false) {
            return next(new ApiError(400, "Đăng nhập không thành công, bạn đã nhập sai mật khẩu! Vui lòng đăng nhập lại."));
        }

        const payload = {
            adminname: admin.adminname,
            email: admin.email,
            id: admin._id,
            role: admin.role

        };

        // Tạo JWT
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });


        return res.send({ status: 200, message: "Dang nhap thanh cong", token, payload })
    }

}