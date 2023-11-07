const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const MongoDB = require('./app/utils/mongodb.util');
const route = require('./routes');



const config = require('./app/config');
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


app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

route(app)

app.use((req, res, next) => {
  return next(new ApiError(400, "Resource not found"));
});


app.use((req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Interal Server Error",
  });
});

app.get('/', function (req, res) {
  res.json({ message: "Welcome to contact book application." });
});
module.exports = app;



