<template>
    <div class="container">
        <div class="row product">

            <h3>Chi tiết sản phẩm</h3>
            <div class="col-md-5 text-center">
                <div class="card">
                    <img :key="image" :src="`http://localhost:3000/images/${product.images}`" :alt="product.productname"
                        class="product-image">
                </div>

            </div>
            <div class="col-md-7">
                <h2>{{ product.productname }}</h2>

                <p>{{ product.describe }}</p>

                <p class="text-price">{{ Price }}&#8363;</p>

                <div class="d-flex">
                    <p class="mt-3">Số lượng:</p>
                    <button class=" button-quantity" @click="decreaseQuantity">-</button>
                    <button class=" button-quantity-number"> {{ quantity }}</button>
                    <button class=" button-quantity" @click="increaseQuantity">+</button>
                </div>



                <button class="price btn btn-danger mt-3" @click="addToCartQuantity(product, quantity)">THÊM VÀO GIỎ
                    HÀNG</button>
            </div>
        </div>
    </div>



    <!-- Lay cac san pham cung danh muc (cac san pham tuong tu)-->

    <div class="container ">
        <div class="row card-product product-same">
            <h4 class="text-center mt-4">CÁC SẢN PHẨM TƯƠNG TỰ</h4>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row d-flex">
                        <div class="card col-sm-4" v-for="item in items" :key="item._id">
                            <img :key="image" :src="`http://localhost:3000/images/${item.images}`" :alt="item.productname"
                                class="item-image mx-auto">
                            <div class="card-body text-center">
                                <p class="card-name">{{ item.productname }}</p>
                                <p class="card-price">{{ item.price.replace(/\s/g, '.') }}&#8363;
                                </p>

                                <div class="icon-hover d-flex">
                                    <div class="icon-eye" @click="viewProduct">
                                        <router-link :to="{ name: 'DetailProduct', params: { id: item._id } }"
                                            class="nav-link">
                                            <i class="bi bi-eye"></i>
                                        </router-link>


                                    </div>
                                    <div class="icon-cart" @click="addToCart(item)">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>



                </div>


            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '@/services/product.service';
import CartService from '@/services/cart.service';

import { useAuthStore } from '../stores/auth';

export default {
    name: 'DetailProduct',

    data() {
        return {
            product: '',
            Price: '',
            items: [],
            isLoggedIn: false,
            quantity: 1, // Số lượng hiện tại của sản phẩm
        };
    },

    mounted() {
        this.fetchfindOneProduct();
    },

    computed: {
        isLoggedIn() {
            return useAuthStore().isLoggedIn;
        },
        userId() {
            return useAuthStore().userId;
        },
    },

    created() {
        this.quantity = 1; // Thiết lập giá trị mặc định ban đầu là 1 trong lifecycle hook created()
    },

    methods: {

        async fetchfindOneProduct() {
            try {
                const productId = this.$route.params.id;

                this.product = await ProductService.findOneProduct(productId);

                this.Price = this.product.price.replace(/\s/g, '.');

                const categoryname = this.product.category;
                const product = this.product._id;


                const similarProducts = await ProductService.findProductByCategory(categoryname, product);
                this.items = this.getRandomElements(similarProducts, 3);

            } catch (error) {
                console.error(error);

            }
        },

        getRandomElements(array, n) {
            const shuffled = array.slice();
            let i = array.length;
            let temp, index;

            while (i--) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }

            return shuffled.slice(0, n);
        },

        async addToCart(item) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userId = localStorage.getItem('userId');
            if (isLoggedIn) {
                const stockQuantity = item.Quantity;

                const updatedQuantity = stockQuantity - this.quantity;

                if (this.quantity <= stockQuantity) {
                    try {
                        // const quantity = this.quantity;
                        const data = {
                            userId: userId,
                            productId: item._id,
                            quantity: this.quantity
                        };
                        console.log("data", data);
                        const response = await CartService.addToCart(data);
                        if (response.status === 200) {
                            alert("Thêm sản phẩm vào giỏ hàng thành công");



                            const dataquantity = {
                                Quantity: updatedQuantity,
                            }

                            // Cập nhật giá trị Quantity mới vào cơ sở dữ liệu
                            const result = await ProductService.updateProduct(item._id, dataquantity);
                            if (result.status === 200) {
                                console.log("Đã cập nhật số lượng trong kho");
                            }
                        }
                    } catch (error) {
                        console.error('Lỗi:', error);
                    }
                } else {
                    alert("Số lượng bạn mua vượt quá số lượng có trong kho");
                }


            } else {
                this.$router.push('/login');
            }
        },


        increaseQuantity() {
            this.quantity++; // Tăng giá trị số lượng
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--; // Giảm giá trị số lượng, nhưng không thấp hơn 1
            }
        },


        async addToCartQuantity(product, quantity) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userId = localStorage.getItem('userId');
            if (isLoggedIn) {
                const stockQuantity = product.Quantity;

                const updatedQuantity = stockQuantity - quantity;
                if (quantity <= stockQuantity) {
                    try {
                        const data = {
                            userId: userId,
                            productId: product._id,
                            quantity: quantity
                        };

                        const response = await CartService.addToCart(data);
                        if (response.status === 200) {
                            alert("Thêm sản phẩm vào giỏ hàng thành công");




                            const dataquantity = {
                                Quantity: updatedQuantity,
                            }

                            // Cập nhật giá trị Quantity mới vào cơ sở dữ liệu
                            const result = await ProductService.updateProduct(product._id, dataquantity);
                            if (result.status === 200) {
                                console.log("Đã cập nhật số lượng trong kho");
                            }
                        }
                    } catch (error) {
                        console.error('Lỗi:', error);
                    }
                } else {
                    alert("Số lượng bạn mua vượt quá số lượng có trong kho");
                }


            } else {
                this.$router.push('/login');
            }
        },

    }
}
</script>

<style scoped>
.text-price {
    color: darkorange;
    font-weight: 700;
}

.item-image {
    width: 250px;
    height: 250px;
    /* text-align: center; */
}


.card-product {
    /* text-align: center; */
    /* border-radius: 16px; */
    overflow: hidden;
    position: relative;
    margin: 30px 0;
}

/* .card-product img {
    text-align: center;
} */

.icon-hover {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.icon-eye,
.icon-cart {
    background-color: #ff0000;
    color: white;
    font-size: 16px;
    /* padding: 16px 32px; */
    padding: 4px 15px;
    margin-left: 5px;
    border-radius: 50%;

}

.icon {
    font-weight: 600;
}


.card-product:hover .product-image {
    opacity: 0.3;
}

.card-product:hover .icon-hover {
    opacity: 1;
}

.card-name,
.card-price {
    font-weight: bolder;
}

.card-price {
    color: red;
}


.product {
    margin: 30px 0;
}

h4,
h3 {
    font-weight: bold;
}

h3 {
    text-align: center;
    margin-bottom: 30px;
}
</style>