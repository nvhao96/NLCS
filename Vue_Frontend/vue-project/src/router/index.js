import { createRouter, createWebHistory } from 'vue-router';
import AdminRouter from './admin.js';
import HomeRouter from './home.js';

const adminRoutesWithMeta = AdminRouter.map(route => {
    return { ...route, meta: { requiresAdmin: true } };
});

const routes = [...adminRoutesWithMeta, ...HomeRouter];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // routes: [
    //     {
    //   path: '/:catchAll(.*)',
    //   name: 'NotFound',
    //   component: NotFound
    // }
    // ]
});



router.beforeEach((to, from, next) => {

    const isAdminRoute = to.matched.some(route => route.meta && route.meta.requiresAdmin);
    const role = localStorage.getItem('role');
    if (isAdminRoute) {

        // const role = localStorage.getItem('role');
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

        if (isAdminLoggedIn === null) {
            // Chuyển hướng đến trang /admin/login nếu không có trường role trong localStorage
            next('/admin/login');
        }
        else if (role === 'false') {
            // Chuyển hướng đến trang bạn không có quyền truy cập nếu role là false
            next('/no-access');
        } else {
            // Cho phép truy cập nếu role là true
            next();
        }

    } else if (to.path.startsWith('/admin')) {
        // Chuyển hướng đến trang /no-access nếu người dùng cố gắng truy cập vào bất kỳ đường dẫn con của /admin khi role là false
        // const role = localStorage.getItem('role');
        if (!role) {
            console.log("chuyen den dang nhap");

            if (to.path !== '/admin/login') {
                next('/admin/login');
            } else {
                // Đã ở trang /admin/login, không chuyển hướng tiếp theo
                next();
            }

        }
        else if (role && role === 'false') {
            next('/no-access');
            console.log("khong co quyen");
        }
        else {
            next();
        }
    } else {
        next();
    }

});

export default router;


