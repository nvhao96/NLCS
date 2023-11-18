<template>
    <div>
        <div class="dropdown log-res" v-if="!storedValue">
            <div class="d-flex align-items-center">
                <div class="d-flex mr-2 d-none d-lg-block login-right">
                    <router-link class="nav-link text-white" to="/login">Đăng Nhập /</router-link>
                </div>

                <div class="d-flex d-none d-lg-block login-right login-right">
                    <router-link class="nav-link text-white p-0" to="/register">Đăng Ký</router-link>
                </div>
            </div>
        </div>

        <div class="dropdown" v-else>
            <button class="btn btn-outline border-none outline-none " type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="/img/user.png" alt="Avatar" class="avatar">
                <p><i class="bi bi-person"></i>: {{ username }}</p>
            </button>



            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-hidden">
                <li><router-link :to="{ name: 'Profile', params: { id: userId } }" class="nav-link text-white">Thông tin hồ
                        sơ</router-link></li>

                <li><router-link :to="{ name: 'Orders', params: { id: userId } }" class="nav-link text-white">Đơn
                        mua</router-link></li>

                <li @click="logout" class="logout nav-link text-white">Đăng xuất <i class="bi bi-box-arrow-right"></i></li>
            </ul>
        </div>
    </div>
</template>

<script>



import { defineComponent, onMounted, watch, ref } from 'vue';


import { useRouter } from 'vue-router';


export default defineComponent({
    setup() {
        const router = useRouter();



        const userId = localStorage.getItem('userId');
        console.log("id", userId);
        const username = localStorage.getItem('username');
        console.log("id", userId);
        const storedValue = ref(localStorage.getItem('isLoggedIn') === 'true');


        const logout = () => {
            router.push('/login'); // Điều hướng tới trang đăng nhập sau khi đăng xuất
            localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập từ local storage
            localStorage.removeItem('userId'); // Xóa người dùng từ local storage
            localStorage.removeItem('role'); // Xóa vai trò từ local storage
            localStorage.removeItem('username'); // Xóa vai trò từ local storage
        };


        // Lấy trạng thái đăng nhập từ local storage khi component được mounted
        onMounted(() => {
            storedValue.value = localStorage.getItem('isLoggedIn') === 'true';

        });

        return {
            logout,
            userId,
            username,
            storedValue
        }


    }
});

</script>

<style scoped>
.logout {
    cursor: pointer;
}

.dropdown:hover .dropdown-menu-hidden {
    display: block;
}

.avatar {
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.log-res {
    margin-top: 35px;
    margin-right: 20px;
}
</style>