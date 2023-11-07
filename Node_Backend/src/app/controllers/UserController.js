const User = require('../models/userModel');

// Hiển thị form đăng ký
exports.showRegistrationForm = (req, res) => {
    res.render('registration');
};

// Đăng ký người dùng mới
exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/register');
        }
        res.redirect('/users');
    });
};

// Hiển thị danh sách người dùng
exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('userList', { users });
    });
};


// Hiển thị form đăng nhập
exports.showLoginForm = (req, res) => {
    res.render('login');
};

// Xử lý đăng nhập
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password }, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }
        if (!user) {
            return res.redirect('/login');
        }
        // Lưu thông tin người dùng đã đăng nhập vào session
        req.session.user = user;
        res.redirect('/dashboard');
    });
};
// Đăng xuất
exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};