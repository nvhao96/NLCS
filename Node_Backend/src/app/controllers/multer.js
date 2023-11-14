const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, 'src/public/images');
        } else {
            cb(new Error('not image'), false);
        }

    },
    filename: function (req, file, cb) {
        urlImage = Date.now() + '.jpg';
        cb(null, urlImage);
    }


});

const upload = multer({ storage: storage });


module.exports = upload;