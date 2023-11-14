const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const MongoDB = require('./app/utils/mongodb.util');
const route = require('./routes');
const ApiError = require("./app/api-error.js")



const config = require('./app/config/index.js');
async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the database!");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }
}

startServer();

// 
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

route(app)

app.use((req, res, next) => {
  // code sẽ chạy khi không có route được định nghĩa nào khớp với yêu câu. Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, 'Resource not found'));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
  // Middleware xử lý lỗi tập trung
  // Trong các đoạn code xử lý ở các route, gọi next(error)
  //  sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || 'Internal Server Error'
  });
});

module.exports = app;



