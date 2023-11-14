const home = [
    {
        path: '/',
        component: () => import('../layouts/User.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('../components/Home.vue')
            },

            {
                path: '/about',
                name: 'About',
                component: () => import('../components/About.vue')
            },

            {
                path: '/cart',
                name: 'Cart',
                component: () => import('../components/Cart.vue')
            },

            {
                path: '/order/:id',
                name: 'Orders',
                component: () => import('../components/Order.vue')
            },

            {
                path: '/product/detail/:id',
                name: 'DetailProduct',
                component: () => import('../components/DetailProduct.vue')
            },

            {
                path: '/product',
                name: 'Product',
                component: () => import('../components/Product.vue'),
            },

            {
                path: '/checkout/:id',
                name: 'Checkout',
                component: () => import('../components/Checkout.vue'),
            },

            {
                path: '/profile/:id',
                name: 'Profile',
                component: () => import('../components/Profile.vue'),
            },


            // {
            //     path: 'contact',
            //     name: 'Contact',
            //     component: () => import('../components/Contact.vue')
            // },

            // {
            //     path: 'search',
            //     name: 'Search',
            //     component: () => import('../components/Search.vue')
            // },
        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register.vue')
    },







    // neu khong dung duong dan da dinh nghia

    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('../layouts/PageNotFound.vue')
    },


];

export default home;