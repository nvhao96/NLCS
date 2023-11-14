const notesRouter = require('./notes.route');
const ordersRouter = require('./order.route');
const cartsRouter = require('./cart.route');
const categorysRouter = require('./category.route');
const productsRouter = require('./product.route');
const usersRouter = require('./user.route');
const loginRouter = require('./login.route');
const registerRouter = require('./register.route');

function route(app) {
    app.use('/api/users', usersRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/register', registerRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/categorys', categorysRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/orders', ordersRouter);

}

module.exports = route;