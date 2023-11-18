<template>
    <div v-if="orderItems.length > 0" class="container  text-center">
        <div class="row order">
            <h3>Các đơn hàng của bạn</h3>

            <div v-for="(item, index) in orderItems" :key="item._id" class="customer-info-container">
                <h6>Tên: {{ item.order.fullname }}</h6>
                <p>Số điện thoại: {{ item.order.phone }}</p>
                <p>Địa chỉ giao hàng: {{ item.order.address }}</p>
                <p>Ngày đặt hàng: {{ item.order.dateDH }}</p>
                <p>Ngày giao hàng: {{ item.order.dateGH }}</p>
                <p>Trạng thái đơn đặt hàng: {{ item.order.status }}</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    :data-bs-target="`#exampleModal${index}`">xem chi tiết
                </button>


                <div class="modal fade" :id="`exampleModal${index}`" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Các sản phẩm trong đơn
                                    hàng
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <table class="table table-hover text-center">
                                        <thead class="dark">
                                            <tr>
                                                <th>Hình Ảnh</th>
                                                <th>Tên</th>
                                                <th>Số lượng</th>
                                                <th>Đơn Giá</th>
                                                <th>Thành Tiền</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr v-for="product in item.details.ordercartItems" :key="product.productId">
                                                <td>
                                                    <img :key="image"
                                                        :src="`http://localhost:3000/images/${product.images}`"
                                                        :alt="product.productname" class="product-image">
                                                </td>
                                                <td>{{ product.productname }}</td>
                                                <td>{{ product.quantity }}</td>
                                                <td>{{ product.price.replace(/\s/g, '.') }}&#8363;</td>
                                                <td>{{ product.subtotalPrice }}&#8363;</td>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>Tổng Tiền:</th>
                                                <th> {{ item.details.totalPrice.toLocaleString('vi-VN') }}&#8363;</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="container card-noorder">

        <div class="card">
            <img src="/img/noorder.png" class="card-img-top image-noorder mx-auto" alt="...">
            <div class="card-body">
                <p>Bạn chưa có đơn hàng nào!</p>
                <router-link to="/product"><button class="btn btn-danger">Tiếp tục mua hàng</button></router-link>
            </div>
        </div>

    </div>
</template>

<script>
import OrderService from '@/services/order.service';

export default {
    name: 'Orders',
    data() {
        return {
            orderItems: [],
        }
    },



    mounted() {

        this.userId = this.$route.params.id;

        if (this.userId) {
            this.getOrders(this.userId);
        }
    },

    methods: {
        async getOrders(userId) {

            try {

                const response = await OrderService.findOneOrder(userId);
                this.orderItems = response;

                console.log("dl", this.orderItems);

            } catch (error) {
                console.error(error);
            }
        },






    },

}
</script>

<style scoped>
.image-noorder,
.product-image {
    width: 250px;
    height: 250px;
}

.card-noorder {
    padding: 20px;
}




.customer-info-container {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.customer-info-container h4 {
    margin-top: 0;
}

.customer-info-container p {
    margin: 5px 0;
}

.customer-info-container .btn {
    background-color: #326e51;
    color: white;
    border: none;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
}

.customer-info-container .btn:hover {
    background-color: #326e51;
}

.order {
    margin: 30px 0;
}

h3 {
    font-weight: bold;
}
</style>