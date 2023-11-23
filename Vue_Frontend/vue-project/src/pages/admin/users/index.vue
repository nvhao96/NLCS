<template>
    <div class="container">
        <div class="row user">
            <h3>Quản lý người dùng</h3>

            <div class="col-lg-6 col-md-6 col-sm-6 customer">
                <h5>Khách Hàng</h5>



                <table class="table table-hover table-bordered customer-table">
                    <thead class="">
                        <tr>
                            <th></th>
                            <th>Tên khách hàng</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.fullname }}</td>
                            <td>{{ user.address }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 admin">
                <!-- <div class="d-flex text-center"> -->
                <h5>Nhân Viên</h5>
                <h6><router-link to="/admin/register">Tạo tài khoản cho nhân viên</router-link></h6>
                <!-- </div> -->

                <table class="table table-hover table-bordered">
                    <thead class="">
                        <tr>
                            <th></th>
                            <th>Tên nhân viên</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(admin, index) in admins" :key="admin.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ admin.adminname }}</td>
                            <td>{{ admin.address }}</td>
                            <td>{{ admin.email }}</td>
                            <td>{{ admin.phone }}</td>
                            <td>{{ admin.chucvu }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
import UserService from '@/services/user.service';

export default {
    name: 'Users',
    data() {
        return {
            users: [],
            admins: [],
        };
    },

    mounted() {
        this.fetchgetAllUsers()
        this.fetchgetAllAdmins()
    },

    methods: {
        async fetchgetAllUsers() {
            try {
                this.users = await UserService.getAllUsers();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchgetAllAdmins() {
            try {
                this.admins = await UserService.getAllAdmins();
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
<style scoped>
h3,
h5 {
    text-align: center;
    font-weight: bold;
    /* margin-top: 20px; */
}

.user {
    margin: 30px 0;
}

table {
    margin: 10px 0;
}

h5 {
    text-align: center;
}

h6 {
    justify-content: end;
}

.customer,
.admin {
    margin: 30px 0;
}

.customer-table {
    margin: 37px 0;
}
</style>