<template>
    <div class="container">
        <h3>Quản lý sản phẩm</h3>
        <!-- <p>Số lượng sản phẩm: {{ productCount }}</p> -->
        <div class="row add-product">
            <div class="col-2"><button @click="addProduct" class="btn btn-success">Thêm sản phẩm</button></div>
            <div class="col-3">
                <form class="d-flex" role="search">

                    <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Nhập sản phẩm"
                        aria-label="Search">
                    <button @click.prevent="searchProducts" class="btn btn-outline-success" type="submit"><i
                            class="bi bi-search"></i></button>

                </form>
            </div>
            <div class="col-1">

            </div>
        </div>


        <div class="row product">



            <table class="table table-hover table-bordered text-center ">
                <thead class="dark">
                    <tr>
                        <th></th>
                        <th>Hình Ảnh</th>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Số Lượng</th>
                        <th>Ghi Chú</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="product._id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <img :key="image" :src="`http://localhost:3000/images/${product.images}`"
                                :alt="product.productname" class="product-image">
                        </td>
                        <td>{{ product.productname }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ (product.price).replace(/\s/g, '.') }}&#8363;</td>
                        <td>{{ product.describe }}</td>
                        <td>{{ product.Quantity }}</td>
                        <td>{{ product.notes }}</td>
                        <td class="d-flex">
                            <button v-if="product._id" @click="deleteProduct(product._id)" class="btn btn-danger"><i
                                    class="bi bi-trash3-fill"></i></button>
                            <router-link :to="{ name: 'updateProduct', params: { id: product._id } }">
                                <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                            </router-link>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ProductService from '@/services/product.service';
import axios from 'axios';
export default {
    name: 'admin-products',
    data() {
        return {
            products: [],
            productCount: 0,
            searchQuery: '',
            // imageUrls: {}

        };
    },

    // mounted() {
    //     this.fetchgetAllProducts();

    // },

    mounted() {
        // this.searchProducts();
    },

    methods: {
        addProduct() {
            this.$router.push('/admin/addproduct');
        },





        async deleteProduct(productId) {
            try {
                if (confirm("Bạn chắc chắn muốn xóa sản phẩm?")) {
                    console.log(productId);
                    await ProductService.deleteProduct(productId);
                    alert('Xóa sản phẩm thành công');
                    this.fetchgetAllProducts();
                }
            } catch (error) {
                console.error(error);
            }
        },

        // async searchProducts(event) {


        //     try {
        //         const response = await ProductService.searchProduct({ searchProduct: this.searchQuery });
        //         this.products = response;
        //         this.searchProducts();
        //     } catch (error) {
        //         console.error(error);
        //     }

        // },




    }
}
</script>
<style scoped>
.product-image {
    width: 175px;
    height: 175px;

}

.title-product,
.content-product {
    justify-content: center;
    border: 1px solid black;

}

h3 {
    text-align: center;
    font-weight: bold;
    margin-top: 30px;
}

.product {
    margin: 30px 0;
}

.add-product {
    margin-top: 30px;
}
</style>