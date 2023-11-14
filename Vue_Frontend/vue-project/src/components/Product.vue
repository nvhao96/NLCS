<template>
    <div class="grid wide container">
        <div class="row sort justify-content-end">
            <div class="custom-select " style="width:400px; heigh: 200px;">
                <select @change="handleSort">
                    <option value="0">Sắp xếp:</option>
                    <option value="1">Lọc theo tên a-z</option>
                    <option value="2">Lọc theo giá thấp-cao</option>
                    <option value="3">Lọc theo giá cao-thấp</option>
                </select>
            </div>
        </div>

        <div class="row product">
            <div class="col-lg-2 d-none d-lg-block ">

                <div class="ietm1">
                    <ul class="ul">
                        <li class="active-category">
                            <h5>DANH MỤC</h5>
                        </li>
                        <li>
                            <p @click="getAllProduct">Tất cả</p>
                        </li>
                        <li v-for="category in categorys" :key="category.id">
                            <p @click="getProduct(category._id)">{{ category.categoryname }}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-10 container">

                <div class="row">
                    <div class="card col-lg-3 col-md-6 col-sm-12" v-for="product in products" :key="product._id">

                        <img :key="image" :src="`http://localhost:3000/images/${product.images}`" :alt="product.productname"
                            class="product-image">
                        <div class="product card-body text-center">
                            <p class="card-name">{{ product.productname }}</p>
                            <p class="card-price">{{
                                parseInt(product.price.replace(/\s/g, '')).toLocaleString('vi-VN') }} &#8363;</p>


                            <div class="icon-hover d-flex">
                                <div class="icon-eye" @click="viewProduct">
                                    <router-link :to="{ name: 'DetailProduct', params: { id: product._id } }"
                                        class="nav-link">
                                        <i class="bi bi-eye"></i>
                                    </router-link>
                                </div>
                                <div class="icon-cart" @click="addToCart(product)">
                                    <i class="bi bi-cart"></i>
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
import CategoryService from '@/services/category.service';
import CartService from '@/services/cart.service';
import ProductService from '@/services/product.service';
import { useAuthStore } from '../stores/auth';

export default {
    name: 'Product',

    data() {
        return {
            categorys: [],
            products: [],
            isLoggedIn: false,
            quantity: 1
        }
    },

    props: {
        product: {
            type: Object,
            required: true,
        },
    },

    mounted() {
        this.fetchgetNameCategorys();

        // Mac dinh khi load trang la co
        this.getAllProduct();
    },

    // computed: {
    //     isLoggedIn() {
    //         return useAuthStore().isLoggedIn;
    //     },

    //     userId() {
    //         return useAuthStore().userId;
    //     },
    // },

    methods: {

        async fetchgetNameCategorys() {
            try {
                this.categorys = await CategoryService.getNameCategorys();
            } catch (error) {
                console.error(error);
            }
        },

        async getProduct(id) {
            try {
                console.log("idmaykahch", id);
                // Gửi categoryId đến máy chủ để lấy danh sách sản phẩm tương ứng

                this.products = await CategoryService.findProduct(id);
            } catch (error) {
                console.error(error);
            }
        },

        async getAllProduct() {
            try {
                this.products = await ProductService.getAllProducts();

            } catch (error) {
                console.error(error);
            }
        },

        async addToCart(product) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userId = localStorage.getItem('userId');
            if (isLoggedIn) {
                const stockQuantity = product.Quantity;

                const updatedQuantity = stockQuantity - this.quantity;


                if (this.quantity <= stockQuantity) {
                    try {
                        const data = {
                            userId: userId,
                            productId: product._id,
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

        handleSort(event) {
            const value = parseInt(event.target.value);
            if (value === 1) {
                this.sortByName();
            } else if (value === 2) {
                this.sortByPriceLow();
            } else if (value === 3) {
                this.sortByPriceHigh();
            }
        },

        // sap xep
        sortByPriceLow() {
            this.products.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/\s/g, ''));
                const priceB = parseInt(b.price.replace(/\s/g, ''));
                return priceA - priceB;
            });
        },

        sortByPriceHigh() {
            this.products.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/\s/g, ''));
                const priceB = parseInt(b.price.replace(/\s/g, ''));
                return priceB - priceA;
            });
        },

        sortByName() {
            this.products.sort((a, b) => {
                const nameA = a.productname.toLowerCase();
                const nameB = b.productname.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        },

    },


}
</script>

<style scoped>
.product-image {
    width: 250px;
    height: 250px;
}

.item {
    margin-top: 16px;
    font-size: 20px;
    color: white;
    text-align: center;
    background-color: orange;




}


.ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 160px;
    background-color: #eff1f0;
    /* background-color: #f3eaea; */
}

li p {
    display: block;
    color: black;
    padding: 8px 16px;
    text-decoration: none;
}

/* Thay đổi màu liên kết khi di chuột qua */
li p:hover {
    /* background-color: #db7093; */
    font-weight: bold;
    color: #04AA6D;
}

li p::after {
    content: '';
    width: 0;
    height: 3px;
    background-color: #04AA6D;
    color: #04AA6D;
    margin: auto;
    display: block;
}

.active-category {
    background-color: #04AA6D;
    color: white;
}

.card {
    text-align: center;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
}

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
    cursor: pointer;

}

.icon {
    font-weight: 600;
}


.card:hover .product-image {
    opacity: 0.3;
}

.card:hover .icon-hover {
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
    margin: 50px 0;
}

.sort {
    text-align: right;
    margin-top: 30px;
}
</style>