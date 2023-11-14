const admin = [
    {
        path: "/admin",
        component: () => import("../layouts/admin.vue"),
        children: [
            {
                path: "home",
                name: "admin-home",
                component: () => import("../pages/admin/index.vue")
            },

            {
                path: "users",
                name: "admin-users",
                component: () => import("../pages/admin/users/index.vue")
            },

            {
                path: "orders",
                name: "admin-orders",
                component: () => import("../pages/admin/orders/index.vue")
            },

            {
                path: "categorys",
                name: "admin-categorys",
                component: () => import("../pages/admin/categorys/index.vue")
            },

            {
                path: "addcategorys",
                name: "admin-addcategorys",
                component: () => import("../pages/admin/categorys/addcategorys.vue")
            },

            {
                path: "detailcategorys",
                name: "admin-detailcategorys",
                component: () => import("../pages/admin/categorys/detailcategorys.vue")
            },

            {
                path: "products",
                name: "admin-products",
                component: () => import("../pages/admin/products/index.vue")
            },
            {
                path: "addproduct",
                name: "admin-addproduct",
                component: () => import("../pages/admin/products/addproduct.vue")
            },
            {
                path: "updateproduct",
                name: "admin-updateproduct",
                component: () => import("../pages/admin/products/updateproduct.vue")
            },
        ]
    },

    {
        path: '/admin/login',
        name: 'adminlogin',
        component: () => import('../pages/admin/adminlogin.vue')
    },

    {
        path: '/admin/register',
        name: 'adminregister',
        component: () => import('../pages/admin/adminregister.vue')
    },
];

export default admin;