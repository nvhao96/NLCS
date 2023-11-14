<template>
    <div class="container">
        <h3>Tất cả sản phẩm của "{{ category }}"</h3>


        <table class="table table-hover table-bordered text-center">
            <thead class="dark">
                <tr>
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
                <tr v-for="product in products" :key="product._id">
                    <td>
                        <img :key="image" :src="`http://localhost:3000/images/${product.images}`" :alt="product.productname"
                            class="product-image">
                    </td>
                    <td>{{ product.productname }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.describe }}</td>
                    <td>{{ product.Quantity }}</td>
                    <td>{{ product.notes }}</td>
                    <td class="d-flex">
                        <!-- <button v-if="product._id" @click="deleteProduct(product._id)" class="btn btn-danger">Xóa</button> -->
                        <button v-if="product._id" @click="deleteProduct(product._id)" class="btn btn-danger"><i
                                class="bi bi-trash3-fill"></i></button>
                        <router-link :to="{ name: 'updateProduct', params: { id: product._id } }">
                            <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                        </router-link>

                    </td>
                    <!-- <td><button v-if="product._id" @click="deleteProduct(product._id)" class="btn btn-danger">Xóa</button>
                        <router-link :to="{ name: 'updateProduct', params: { id: product._id } }">
                            <button class="btn btn-warning">Cập nhật</button>
                        </router-link>

                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import CategoryService from '@/services/category.service';

export default {
    name: 'admin-detailcategorys',

    data() {
        return {
            products: [],
            category: '',
        };
    },

    mounted() {
        this.fetchfindProduct();
    },

    methods: {
        async fetchfindProduct() {
            try {
                const categoryId = this.$route.params.id;
                // this.categoryname = this.$route.params.category;
                // console.log("this.$route.params.category");
                console.log("idmaykahch", categoryId);
                // Gửi categoryId đến máy chủ để lấy danh sách sản phẩm tương ứng

                this.products = await CategoryService.findProduct(categoryId);


                if (this.products.length > 0) {
                    this.category = this.products[0].category;
                }
                console.log("product: ", this.products);
            } catch (error) {
                console.error(error);
            }
        },
    }

}
</script>

<style scoped>
.product-image {
    width: 175px;
    height: 175px;

}

h3 {
    margin: 30px 0;
    font-weight: bold;
    text-align: center;
}
</style>