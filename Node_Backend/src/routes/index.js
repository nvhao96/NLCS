const userRoute = require('./userRoute');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoutes');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');

function route(app) {
    app.use('/register', userRoute);
    app.use('/login', userRoute);
    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
    app.use('/cart', cartRoute);
    app.use('/order', orderRoute);

}

module.exports = route;