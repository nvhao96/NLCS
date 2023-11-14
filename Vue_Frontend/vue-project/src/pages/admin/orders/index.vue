<template>
    <div class="container">
        <h3>Quản lý đơn hàng</h3>
        <div clas="row order">
            <table class="table table-hover table-bordered text-center">
                <thead class="dark">
                    <tr>
                        <th>Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Địa chỉ</th>
                        <th>Tổng Tiền</th>
                        <th>Phương Thức Thanh Toán</th>
                        <th>Ngày Đặt Hàng</th>
                        <th>Ngày Giao Hàng</th>

                        <th>Nhân Viên</th>
                        <th>Trạng Thái</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in orderItems" :key="item._id">
                        <td>{{ item.order.fullname }}</td>
                        <td>{{ item.order.phone }}</td>
                        <td>{{ item.order.address }}</td>
                        <td>{{ (item.details.grandTotalPrice).toLocaleString("vi-VN") }}&#8363;</td>
                        <td>{{ item.order.paymentMethod }}</td>

                        <td>{{ item.order.dateDH }}</td>
                        <td>{{ item.order.dateGH }}</td>

                        <td>{{ item.order.adminId }}</td>
                        <!-- <td>{{ adminname }}</td> -->
                        <td>{{ item.order.status }}</td>

                        <td>
                            <div class="d-flex">
                                <button class="btn btn-warning" @click="updateOrder(item.order._id)">Xử lí</button>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    :data-bs-target="`#exampleModal${index}`">
                                    <i class="bi bi-eye-fill"></i>
                                </button>


                                <div class="modal fade" :id="`exampleModal${index}`" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Các sản phẩm trong đơn
                                                    hàng
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
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
                                                            <tr v-for="product in item.details.ordercartItems"
                                                                :key="product.productId">
                                                                <td>
                                                                    <img :key="image"
                                                                        :src="`http://localhost:3000/images/${product.images}`"
                                                                        :alt="product.productname" class="product-image">
                                                                </td>
                                                                <td>{{ product.productname }}</td>
                                                                <td>{{ product.quantity }}</td>
                                                                <td>{{ product.price.toLocaleString("vi-VN") }}</td>
                                                                <td>{{ product.subtotalPrice.toLocaleString("vi-VN") }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th>Tổng Tiền: {{
                                                                    item.details.totalPrice.toLocaleString("vi-VN")
                                                                }}&#8363;
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import OrderService from '@/services/order.service';
// import moment from "moment";

export default {
    name: 'admin-orders',

    data() {
        return {
            orderItems: [],
            adminname: '',
        }

    },

    mounted() {
        this.getOrders();
    },

    methods: {
        async getOrders() {

            try {

                const response = await OrderService.getAllOrders();
                this.orderItems = response;
                console.log(" order", this.orderItems);

            } catch (error) {
                console.error(error);
            }
        },

        async updateOrder(item) {
            const orderId = item;
            console.log("orderId", orderId);
            const dateGH = moment().format("HH:mm:ss DD-MM-YYYY");
            const adminId = localStorage.getItem('adminId');

            const data = {
                dateGH,
                adminId
            }

            const response = await OrderService.updateOrder(orderId, data);

            if (response.status === 200) {
                alert('Cập nhật đơn hàng thành công');
                this.getOrders();
            }
        }

    },

}
</script>

<style scoped>
.product-image {
    width: 150px;
    height: 150px;
}

h3 {
    text-align: center;
    font-weight: bold;
    margin-top: 30px;
}

.order {
    margin: 30px 0;
}
</style>