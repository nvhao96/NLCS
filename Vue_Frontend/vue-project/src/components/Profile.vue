<template>
    <div class=" mb-3 text-center container" style="max-width: 540px;">
        <div class="row g-0 profile card">
            <h3>Hồ sơ cá nhân</h3>
            <div class="row justity-content-center ">
                <div><img src="/img/user.png" class="img-fluid rounded-start user " alt="..."></div>

            </div>

            <div class="row justity-content-center">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="">
                        <div class="card-body">
                            <form class=" " @submit="updateUser($event, userId)">
                                <div class="mb-3">
                                    <label class="form-label title-product">Tên: </label>
                                    <div class="quantity-product-input">
                                        <input type="text" class="form-control" v-model="fullname">
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label title-product">Email: </label>
                                    <div class="quantity-product-input">
                                        <input type="text" class="form-control" v-model="email">
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label title-product">Số điện thoại: </label>
                                    <div class="quantity-product-input">
                                        <input type="text" class="form-control" v-model="phone">
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label title-product">Địa chỉ: </label>
                                    <div class="quantity-product-input">
                                        <input type="text" class="form-control" v-model="address">
                                    </div>
                                </div>

                                <button type="submit" class="btn mb-3">CẬP NHẬT</button>

                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/user.service';

export default {
    name: 'Profile',

    data() {
        return {
            fullname: '',
            email: '',
            phone: '',
            address: '',

        };
    },

    created() {
        this.userId = this.$route.params.id;

        if (this.userId) {
            this.get(this.userId);
        }
    },

    methods: {
        async updateUser(event, userId) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)

            if (this.fullname === '' || this.email === '' || this.phone === '' || this.address === '') {
                this.showError = true;
            } else {
                this.showError = false;

                const formData = new FormData();
                formData.append('fullname', this.fullname);
                formData.append('phone', this.phone);
                formData.append('email', this.email);
                formData.append('address', this.address);
                console.log("data1", userId);

                try {
                    console.log("data1", userId);
                    const response = await UserService.updateUser(userId, formData);
                    if (response.status === 200) {
                        console.log("response", response);
                        alert("Cập nhật thành công");
                        // this.$router.push('/profile');
                    } else {
                        console.log("response", response);
                        console.error('Error', response.message);
                        console.log(response.status);
                    }
                } catch (error) {
                    this.error = error.response.message;
                    this.showError = true;
                }

            }

        },


        async get(userId) {
            try {
                const response = await UserService.findOneUser(userId);
                console.log("data", response);
                this.fullname = response.fullname;
                this.address = response.address;
                this.phone = response.phone;
                this.email = response.email;



            } catch (error) {
                console.error(error);

            }
        },
    }

}
</script>

<style scoped>
.user {
    width: 200px;
    height: 200px;

}

.profile {
    margin: 30px 0;
}

h3,
.title-product {
    font-weight: bold;
}

.btn {
    color: rgb(20, 20, 255);
    font-weight: bold;
    background-color: rgb(179, 205, 255);
}
</style>