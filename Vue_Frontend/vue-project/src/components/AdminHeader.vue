<template>
    <nav class="navbar navbar-expand-sm bg">

        <div class="container-fluid justity-content-between">

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="mx-auto ">
                <img src="/img/logo.png" class="img-thumbnail navbar-brand" width="50" alt="">
            </div>


            <div class=" d-flex justify-content-end">

                <div class="navbar-brand d-flex align-items-center">
                    <div class="dropdown">
                        <button type="button" class="btn" data-bs-toggle="dropdown">
                            <img src="/img/user.png" alt="Logo" style="width:40px;" class="rounded-pill">
                            <span class="name">{{ adminname }}</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-hidden">
                            <!-- <li class="dropdown-item">Thông tin hồ sơ</li> -->
                            <li @click="logout" class="dropdown-item">Đăng xuất <i class="bi bi-box-arrow-right"></i></li>

                        </ul>
                    </div>
                </div>


            </div>
        </div>

    </nav>

    <div class="nav-content">
        <ul class="nav justify-content-center">
            <li>
                <p><router-link to="/admin/home" class="nav-link"> TRANG
                        CHỦ</router-link>
                </p>
            </li>
            <li class="">
                <p><router-link to="/admin/categorys" class="nav-link">QUẢN LÝ DANH MỤC</router-link></p>
            </li>
            <li class="">
                <p><router-link to="/admin/products" class="nav-link">QUẢN LÝ SẢN PHẨM</router-link></p>
            </li>
            <li class="">
                <p><router-link to="/admin/orders" class="nav-link">QUẢN LÝ ĐƠN HÀNG</router-link></p>
            </li>
            <li class="">
                <p><router-link to="/admin/users" class="nav-link">QUẢN LÝ NGƯỜI DÙNG</router-link></p>
            </li>

        </ul>

    </div>


    <!-- Offcanvas Navbar -->
    <div class="nav-content-2">
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <!-- <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5> -->
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="">
                        <p><router-link to="/admin/home" class="nav-link nav-text">TRANG CHỦ</router-link></p>
                    </li>
                    <li class="">
                        <p><router-link to="/admin/categorys" class="nav-link nav-text">QUẢN LÝ DANH MỤC</router-link></p>
                    </li>
                    <li class="">
                        <p><router-link to="/admin/products" class="nav-link nav-text">QUẢN LÝ SẢN PHẨM</router-link></p>
                    </li>
                    <li class="nav-item">
                        <p><router-link to="/admin/orders" class="nav-link nav-text">QUẢN LÝ ĐƠN HÀNG</router-link></p>
                    </li>
                    <li class="">
                        <p><router-link to="/admin/users" class="nav-link nav-text">QUẢN LÝ NGƯỜI DÙNG</router-link></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { useAdminStore } from '../stores/admin';
export default defineComponent({
    name: 'AdminHeader',

    setup() {
        const router = useRouter();
        const adminAuth = useAdminStore();
        const adminId = localStorage.getItem('adminId');
        const adminname = localStorage.getItem('adminname');
        const storedValue = ref(localStorage.getItem('isLoggedIn') === 'true');


        const logout = () => {

            // localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập từ local storage
            // localStorage.removeItem('adminId'); // Xóa người dùng từ local storage
            // localStorage.removeItem('role'); // Xóa vai trò từ local storage
            // localStorage.removeItem('adminname'); // Xóa vai trò từ local storage
            adminAuth.logout();
            router.push('/admin/login'); // Điều hướng tới trang đăng nhập sau khi đăng xuất
        };


        return {
            logout,
            adminId,
            adminname,
            storedValue,
        }
    }


})
</script>

<style scoped>
.name {
    color: white;
}

.dropdown {
    cursor: pointer;
}

.dropdown:hover .dropdown-menu-hidden {
    display: block;
}

.bg {
    background-color: #326e51;
}




.nav-content ul,
.nav-content-2 ul {

    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #f3f3f3;


}

.nav-content li {
    float: left;


}

.nav-content li .nav-link {
    display: block;
    color: #666;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-weight: bold;
    /* position: relative; */


}


.nav-content li .nav-link:hover {
    color: #326e51;
}

.nav-content li .nav-link::after,
.nav-content-2 li .nav-link::after {
    content: '';
    width: 0;
    height: 3px;
    background-color: #326e51;
    margin: auto;
    display: block;
}

.nav-content li .nav-link:hover::after,
.nav-content-2 li .nav-link:hover::after {
    width: 100%;
    transition: width 0.3s linear;
}


@media (max-width: 768px) {
    .name {
        display: none;
    }
}

/* nhỏ hơn 767 thì sẽ không hiển thị */
@media (max-width: 767px) {
    .nav-content {
        display: none;
    }
}

.active {
    /* CSS cho hiệu ứng hoạt động khi mục được kích hoạt */
    background-color: #f5f5f5;
    /* Thay đổi màu nền tại đây */
}
</style>