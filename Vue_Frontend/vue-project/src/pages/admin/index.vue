<template>
    <div class="container ">
        <div class="row total">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="manage d-flex border">
                    <div><i class="bi bi-database icon icon-product"></i></div>
                    <div class="content">
                        <h6 class="title">TỔNG SẢN PHẨM</h6>
                        <p class="text">{{ productCount }} sản phẩm</p>
                    </div>

                </div>

            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="manage d-flex border">
                    <div><i class="bi bi-cart3 icon icon-order"></i></div>
                    <div class="content">
                        <h6 class="title">TỔNG ĐƠN HÀNG</h6>
                        <p class="text">{{ orderCount }} đơn hàng</p>
                    </div>

                </div>

            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="manage d-flex border">
                    <div><i class="bi bi-person-circle icon icon-user"></i></div>
                    <div class="content">
                        <h6 class="title">TỔNG KHÁCH HÀNG</h6>
                        <p class="text">{{ userCount }} khách hàng</p>
                    </div>

                </div>

            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="manage d-flex border">
                    <div><i class="bi bi-coin icon icon-money"></i></div>
                    <div class="content">
                        <h6 class="title">TỔNG DOANH THU</h6>
                        <p class="text">{{ totalPrice.toLocaleString("vi-VN") }} &#8363;</p>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '@/services/product.service';
import OrderService from '@/services/order.service';
import UserService from '@/services/user.service';

export default {
    name: 'admin-home',

    data() {
        return {
            products: [],
            productCount: 0,

            orderItems: [],
            orderCount: 0,

            totalPrice: 0,

            users: [],
            userCount: 0,

        };
    },

    mounted() {
        this.fetchgetAllProducts();
        this.getOrders();
        this.fetchgetAllUsers()

    },

    methods: {
        async fetchgetAllProducts() {
            try {
                this.products = await ProductService.getAllProducts();

                // tong so san pham
                this.productCount = this.products.length;
            } catch (error) {
                console.error(error);
            }
        },

        async getOrders() {

            try {

                const response = await OrderService.getAllOrders();
                this.orderItems = response;
                console.log("order", this.orderItems);

                // tong doanh thu
                this.totalPrice = this.orderItems.reduce((sum, item) => sum + item.details.grandTotalPrice, 0);
                console.log("tong", this.totalPrice);

                // tong so don hang
                this.orderCount = this.orderItems.length;

            } catch (error) {
                console.error(error);
            }
        },

        async fetchgetAllUsers() {
            try {
                this.users = await UserService.getAllUsers();
                // tong nguoi dung
                this.userCount = this.users.length;
            } catch (error) {
                console.error(error);
            }
        },
    }

}
</script>

<style scoped>
.icon {
    font-size: 40px;
    padding: 20px;
    border-radius: 10px;
    ;
}

.manage {
    overflow: hidden;
    padding: 30px 5px;
}

.content {
    margin-left: 10px;
}

.content h6,
.text {
    font-weight: 600;
}

.icon-product {
    color: cornflowerblue;
    background-color: rgb(175, 203, 255);
}

.icon-order {
    color: rgb(242, 39, 79);
    background-color: rgb(255, 221, 227);
}

.icon-money {
    color: rgb(246, 209, 1);
    background-color: rgb(246, 255, 153);
}

.icon-user {
    color: rgb(122, 78, 163);
    background-color: rgb(238, 197, 255);
}

.title {
    color: rgb(220, 2, 2);
}

.total {
    margin: 30px 0;
}
</style>