<template>
    <div class="container">
        <h3>THANH TOÁN</h3>
        <hr>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-30">
                <div class="container">
                    <form>

                        <div class="row">
                            <div class="col-50">
                                <h4>Thông tin mua hàng</h4>
                                <hr>
                                <label for="fname"><i class="fa fa-user"></i> Tên</label>
                                <input type="text" id="fname" name="firstname" v-model="fullname">
                                <label for="email"><i class="fa fa-envelope"></i> Email</label>
                                <input type="text" id="email" name="email" v-model="email">
                                <label for="adr"><i class="fa fa-address-card-o"></i> Địa chỉ</label>
                                <input type="text" id="adr" name="address" v-model="address">
                                <label for="city"><i class="fa fa-institution"></i> Số điện thoại</label>
                                <input type="text" id="city" name="city" v-model="phone">

                            </div>

                        </div>
                    </form>

                    <router-link to="/cart" class="nav-link"><i class="bi bi-arrow-left-short"></i> Quay lại giỏ
                        hàng</router-link>
                </div>
            </div>
            <div class="col-70">
                <div class="container">
                    <h4>Đơn hàng <span class="price" style="color:black"><i class="fa fa-shopping-cart"></i>
                            <b>{{ cartItems.length }}</b>
                        </span>
                    </h4>
                    <hr>

                    <div>
                        <div class="row">
                            <div class="col-lg-3">
                                <p>Sản Phẩm</p>
                            </div>
                            <div class="col-lg-3">Đơn Giá</div>
                            <div class="col-lg-3">Số lượng</div>
                            <div class="col-lg-3">Thành Tiền</div>
                        </div>

                        <div class="row" v-for="(item, index) in cartItems" :key="item.id">
                            <div class="col-lg-3">
                                <img :key="image" :src="`http://localhost:3000/images/${item.images}`"
                                    :alt="item.productname" class="product-image-checkout">

                                <p>{{ item.productname }}</p>
                            </div>

                            <div class="col-lg-3">
                                <p>{{ parseInt(item.price.replace(/\s/g, '')).toLocaleString('vi-VN') }}</p>
                            </div>

                            <div class="col-lg-3">
                                <p>{{ item.quantity }}</p>
                            </div>

                            <div class="col-lg-3">
                                <p>{{ subtotalPrice[index] }}</p>
                            </div>

                        </div>
                    </div>
                    <hr>

                    <div class="d-flex">
                        <input type="text" class="input-discount" placeholder="Nhập mã giảm giá">
                        <span><button class=" btn-discount ">Áp dụng</button></span>
                    </div>

                    <hr>
                    <p>Tạm tính <span class="price" style="color:black"><b>{{ totalPrice }}</b></span></p>
                    <p>Phí vận chuyển <span class="price" style="color:black"><b>30.000</b></span></p>
                    <hr>

                    <div>
                        <p>PHƯƠNG THỨC THANH TOÁN</p>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                v-model="paymentMethod" value="online">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Thanh toán online
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked v-model="paymentMethod" value="thanh toán khi nhận hàng">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Thanh toán khi nhận hàng
                            </label>
                        </div>
                    </div>

                    <hr>
                    <p>Tổng cộng <span class="price" style="color:black"><b>{{ grandTotalPrice }}</b></span></p>

                    <div>
                        <button class="btn" @click="createOrder">ĐẶT HÀNG</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '@/services/user.service';
import CartService from '@/services/cart.service';
import OrderService from '@/services/order.service';
import moment from "moment";

export default {
    name: 'Checkout',

    setup() {
        const router = useRouter();
        const userId = ref(null);
        const fullname = ref('');
        const address = ref('');
        const phone = ref('');
        const email = ref('');
        const cartItems = ref([]);
        const paymentMethod = ref('thanh toán khi nhận hàng'); // Mặc định chọn thanh toán khi nhận hàng


        // Lấy tham số từ URL khi component được tạo
        userId.value = router.currentRoute.value.params.id;

        const getUser = async () => {
            try {
                const response = await UserService.findOneUser(userId.value);
                fullname.value = response.fullname;
                address.value = response.address;
                phone.value = response.phone;
                email.value = response.email;
            } catch (error) {
                console.error(error);
            }
        };


        const getCart = async () => {

            try {
                const response = await CartService.getCart(userId.value); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn
                cartItems.value = response;
            } catch (error) {
                console.error(error);
            }
        };

        const deleteAllCart = async (userId) => {

            try {
                const response = await CartService.deleteAllCart(userId); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn
                if (response.status === 200) {
                    console.log("Đã xóa tất cả sản phẩm trong giỏ hàng");
                }
            } catch (error) {
                console.error(error);
            }
        };



        onMounted(getUser); // Gọi hàm getUser khi component được mounted

        onMounted(getCart);


        // const selectedItemsUpdated = (items) => {
        //     selectedItems.value = items;
        // };

        // onMounted(() => {
        //     eventBus.$on('selectedItemsUpdated', selectedItemsUpdated);
        // });

        // onUnmounted(() => {
        //     eventBus.$off('selectedItemsUpdated', selectedItemsUpdated);
        // });



        // ...

        const totalPrice = computed(() => {
            const calculatedTotalPrice = cartItems.value.reduce((total, item) => {
                const itemPrice = parseFloat(item.price.replace(/\s/g, ''));
                const itemQuantity = parseInt(item.quantity);
                return total + itemPrice * itemQuantity;
            }, 0);

            return calculatedTotalPrice.toLocaleString('vi-VN').replace(/,/g, ' ');
        });

        const subtotalPrice = computed(() => {
            return cartItems.value.map(item => {
                const itemPrice = parseFloat(item.price.replace(/\s/g, ''));
                const itemQuantity = parseInt(item.quantity);
                const calculatedSubtotalPrice = itemPrice * itemQuantity;
                return calculatedSubtotalPrice.toLocaleString('vi-VN').replace(/,/g, ' ');
            });
        });

        const grandTotalPrice = computed(() => {
            const calculatedTotalPrice = cartItems.value.reduce((total, item) => {
                const itemPrice = parseFloat(item.price.replace(/\s/g, ''));
                const itemQuantity = parseInt(item.quantity);
                return total + itemPrice * itemQuantity;
            }, 0);

            const totalPriceWithAdditional = calculatedTotalPrice + 30000;

            return totalPriceWithAdditional.toLocaleString('vi-VN').replace(/,/g, ' ');
        });


        const createOrder = async () => {
            try {
                // const totalPrice = totalPrice.value;
                console.log("totalprice", grandTotalPrice.value);

                const dateDH = moment().format("HH:mm:ss DD-MM-YYYY");

                // Tính toán subtotalPrice cho từng sản phẩm
                const subtotalPrices = cartItems.value.map(item => {
                    const itemPrice = parseFloat(item.price.replace(/\s/g, ''));
                    const itemQuantity = parseInt(item.quantity);
                    const calculatedSubtotalPrice = itemPrice * itemQuantity;
                    return calculatedSubtotalPrice.toLocaleString('vi-VN').replace(/,/g, ' ');
                });

                // Tạo ordercartItems với subtotalPrice tương ứng
                const ordercartItems = cartItems.value.map((item, index) => {
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        images: item.images,
                        productname: item.productname,
                        subtotalPrice: subtotalPrices[index],
                    };
                });

                const data = {
                    grandTotalPrice: grandTotalPrice.value,
                    totalPrice: totalPrice.value,
                    userId: userId.value,
                    // cartItems: cartItems.value,
                    dateDH,
                    phone: phone.value,
                    address: address.value,
                    fullname: fullname.value,
                    paymentMethod: paymentMethod.value,
                    ordercartItems: ordercartItems,
                };

                console.log("data", data);

                const response = await OrderService.createOrder(data);

                if (response.status === 200) {
                    alert("Đặt hàng thành công");

                    console.log("id", userId.value);
                    deleteAllCart(userId.value);

                    router.push({ name: 'Orders', params: { id: userId.value } });
                } else {
                    alert("That bai");
                }
            } catch (error) {
                console.error(error);
            }


        };


        // Sử dụng danh sách các thành phần được chọn ở đây

        return {

            userId,
            fullname,
            address,
            phone,
            email,

            cartItems,
            totalPrice,
            subtotalPrice,
            grandTotalPrice,

            createOrder,
            paymentMethod,
            deleteAllCart,
        };
    },


}
</script>

<style scoped>
.product-image-checkout {
    width: 150px;
    height: 150px;
}

.row {
    display: -ms-flexbox;
    /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap;
    /* IE10 */
    flex-wrap: wrap;
    margin: 0 -16px;
}

.col-25 {
    -ms-flex: 25%;
    /* IE10 */
    flex: 25%;
}

.col-50 {
    -ms-flex: 50%;
    /* IE10 */
    flex: 50%;
}

.col-30 {
    -ms-flex: 30%;
    /* IE10 */
    flex: 30%;
}

.col-70 {
    -ms-flex: 70%;
    /* IE10 */
    flex: 70%;
}

.col-75 {
    -ms-flex: 75%;
    /* IE10 */
    flex: 75%;
}

.col-25,
.col-50,
.col-75 {
    padding: 0 16px;
}

.container {
    background-color: #f2f2f2;
    padding: 5px 20px 15px 20px;
    /* border: 1px solid lightgrey;
    border-radius: 3px; */
}

input[type=text] {
    /* width: 50%; */
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

label {
    margin-bottom: 10px;
    display: block;
}

.icon-container {
    margin-bottom: 20px;
    padding: 7px 0;
    font-size: 24px;
}

.btn {
    background-color: #04AA6D;
    color: white;
    padding: 12px;
    margin: 10px 0;
    border: none;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    font-size: 17px;
}

.btn:hover {
    background-color: #45a049;
}

a {
    color: #2196F3;
}

hr {
    border: 1px solid lightgrey;
}

span.price {
    float: right;
    color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
    .row {
        flex-direction: column-reverse;
    }

    .col-25 {
        margin-bottom: 20px;
    }
}

.input-discount {
    width: 30%;
    align-items: center;
}

.btn-discount {
    background-color: #04AA6D;
    color: white;
    padding: 12px;
    border: none;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    font-size: 17px;
}

.btn-discount:hover {
    background-color: #45a049;
}
</style>