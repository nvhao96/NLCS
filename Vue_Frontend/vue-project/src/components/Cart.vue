<template>
    <div v-if="isEmptyCart" class="container card-nocart text-center">
        <!-- <div class="container text-center">
            <div class="no-cart">
                <img src="/img/nocart.png" class="img-fuild image-nocart" alt="">
                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                <router-link to="/product2"><button class="btn btn-danger">TIẾP TỤC MUA SẮM NHÉ!</button></router-link>
            </div>

        </div> -->


        <div class="card text-center">
            <img src="/img/nocart.png" class="card-img-top image-nocart mx-auto" alt="...">
            <div class="card-body text-center">
                <p class="card-text">Chưa có sản phẩm nào trong giỏ hàng.</p>
                <router-link to="/product"><button class="btn btn-danger">TIẾP TỤC MUA SẮM NHÉ!</button></router-link>
            </div>
        </div>
    </div>


    <div v-else class="container">
        <table class="table text-center">
            <thead class="table-bordered">
                <tr>
                    <th></th>
                    <th>Sản Phẩm</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Đơn Giá</th>
                    <th>Số Lượng</th>
                    <th>Số Tiền</th>
                    <th>Thao Tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cartItems" :key="item.id">
                    <!-- <td><input class="checkbox" type="checkbox" :value="item.id" v-model="item.selected"></td> -->
                    <td></td>
                    <td><img :key="image" :src="`http://localhost:3000/images/${item.images}`" :alt="item.productname"
                            class="product-image"></td>
                    <td>{{ item.productname }}</td>
                    <td>{{ parseInt(item.price.replace(/\s/g, '')).toLocaleString('vi-VN') }}</td>
                    <td>

                        <div class="d-flex text-center">

                            <button class=" button-quantity" @click="decreaseQuantity(item)">-</button>
                            <button class=" button-quantity-number"> {{ item.quantity }}</button>
                            <button class=" button-quantity" @click="increaseQuantity(item)">+</button>
                        </div>
                    </td>
                    <td>{{ subtotalPrice[index] }}</td>
                    <td><button class="btn btn-danger" @click="deleteCart(item)"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Tổng Thanh Toán: {{ totalPrice }}</td>
                    <td></td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{ name: 'Checkout', params: { id: userId } }"><button class="btn btn-danger"
                                @click="handleCheckout">Thanh Toán</button></router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { computed, ref, watch } from 'vue';
import CartService from '@/services/cart.service';

export default {
    name: 'Cart',

    data() {
        return {
            cartItems: [],
            totalQuantity: 0,
            // selectedItems: [],
        };
    },

    computed: {
        // userId() {
        //     return useAuthStore().userId;
        // },


        userId() {
            return localStorage.getItem('userId');
        },
        //dang sai 4/11
        isEmptyCart() {
            return this.cartItems.length === 0;
        },

        totalPrice() {
            const totalPrice = this.cartItems.reduce((total, item) => {
                const itemPrice = parseFloat(item.price.replace(/\s/g, '')); // Xóa khoảng trắng và chuyển đổi giá tiền thành số
                const itemQuantity = parseInt(item.quantity); // Chuyển đổi số lượng thành số nguyên
                return total + itemPrice * itemQuantity;
            }, 0);

            return totalPrice.toLocaleString('vi-VN').replace(/,/g, ' '); // Định dạng số với dấu phân cách và thay thế dấu phân cách bằng khoảng trắng
        },

        subtotalPrice() {
            return this.cartItems.map(item => {
                const itemPrice = parseFloat(item.price.replace(/\s/g, '')); // Xóa khoảng trắng và chuyển đổi giá tiền thành số
                const itemQuantity = parseInt(item.quantity); // Chuyển đổi số lượng thành số nguyên

                const totalPrice = itemPrice * itemQuantity;
                console.log("totalprice", totalPrice);
                return totalPrice.toLocaleString('vi-VN').replace(/,/g, ' '); // Định dạng số với dấu phân cách và thay thế dấu phân cách bằng khoảng trắng
            });
        },

        // subtotalPrice() {
        //     return this.cartItems.map(item => {
        //         const itemPrice = parseFloat(item.price.replace(/\s/g, ''));
        //         const itemQuantity = parseInt(item.quantity);
        //         const totalPrice = itemPrice * itemQuantity;
        //         return totalPrice.toLocaleString('vi-VN').replace(/,/g, ' ');
        //     });
        // }


        // select_all: {
        //     get() {
        //         return this.cartItems.length > 0 && this.cartItems.every(item => item.selected);
        //     },
        //     set(value) {
        //         this.cartItems.forEach(item => {
        //             item.selected = value;
        //             if (value) {
        //                 this.saveSelectedItems(item);
        //             } else {
        //                 this.removeSelectedItems(item);
        //             }
        //         });
        //     },
        // },
    },

    methods: {
        async increaseQuantity(item) {
            // Tăng giá trị quantity của item lên 1
            item.quantity++;
            // const authStore = useAuthStore();
            // const userId = authStore.userId;
            const userId = localStorage.getItem('userId');
            // console.log("soluong", item.quantity);
            // console.log("item.productId", item.productId);
            const response = await CartService.updateCart(userId, item.productId, item.quantity);
            if (response.status === 200) {
                alert("Cập nhật thành công");
                this.getCart();
            }

        },

        async decreaseQuantity(item) {
            // Giảm giá trị quantity của item xuống 1
            if (item.quantity > 1) {
                item.quantity--;
                // const authStore = useAuthStore();
                // const userId = authStore.userId;
                const userId = localStorage.getItem('userId');
                console.log("soluong", item.quantity);
                console.log("item.productId", item.productId);
                const response = await CartService.updateCart(userId, item.productId, item.quantity);
                if (response.status === 200) {
                    alert("Cập nhật thành công");
                    this.getCart();
                }
            }
        },


        async getCart() {

            try {
                // const authStore = useAuthStore();
                // const userId = authStore.userId;
                const userId = localStorage.getItem('userId');
                const response = await CartService.getCart(userId); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn
                this.cartItems = response;
            } catch (error) {
                console.error(error);
            }
        },

        async deleteCart(item) {

            try {
                // const authStore = useAuthStore();
                // const userId = authStore.userId;
                const userId = localStorage.getItem('userId');
                const productId = item.productId;
                const response = await CartService.deleteCart(userId, productId); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn
                if (response.status === 200) {
                    alert("Xóa sản phẩm trong giỏ hàng thành công!");
                    this.getCart();
                }

            } catch (error) {
                console.error("Lỗi", error);
            }
        },







        // checkCart(){
        //     if(this.cartItems.length)
        // }

        // saveSelectedItems(item) {
        //     if (!this.selectedItems.includes(item)) {
        //         this.selectedItems.push(item);

        //     }
        // },
        // removeSelectedItems(item) {
        //     const index = this.selectedItems.indexOf(item);
        //     if (index !== -1) {
        //         this.selectedItems.splice(index, 1);
        //     }
        // },
        // selectAllItems() {
        //     if (this.select_all) {
        //         this.selectedItems = this.cartItems.map(item => item);
        //     } else {
        //         this.selectedItems = [];
        //     }
        // },


        // handleCheckout() {


        //     this.checkSelectedItems();
        // },
        // checkSelectedItems() {
        //     this.selectedItems = this.cartItems.filter(item => item.selected);
        //     console.log("Các mục đã chọn:", this.selectedItems);
        // }


    },



    mounted() {
        this.getCart();

        // this.isEmptyCart()

        // this.checkCart();
    },

    watch: {
        cartItems: {
            handler(newCartItems) {
                this.totalQuantity = newCartItems.reduce((total, item) => total + parseInt(item.quantity), 0); //parseInt chuyen doi chuoi thanh so
                const cartStore = useCartStore();
                cartStore.setTotalQuantity(this.totalQuantity);
                console.log("quantity", this.totalQuantity); // Gọi mutation để cập nhật biến totalQuantity trong store cart
            },
            immediate: true,
        },
    },

};
</script>

<style scoped>
.product-image {
    width: 250px;
    height: 250px;
}

.product-cart {
    border: solid 1px grey;
}

.total-price,
.buying {
    text-align: end;
}

.checkbox {
    align-items: center;
    height: 20px;
    width: 20px;
}


.image-nocart {
    width: 250px;
    margin: 30px 0;
    align-items: center;
    /* height: 250px; */
}

.card-nocart {
    padding: 20px;
}
</style>