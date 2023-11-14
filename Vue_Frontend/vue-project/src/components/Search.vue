<template>
    <div v-if="searchResults.length > 0" class="text-center">
        <div class="search">
            <p>Kết quả tìm kiếm cho "<span class="search-keyword">{{ searchkey }}</span>"</p>

            <div class="container">
                <div class="row  search-result">
                    <div class="card col-lg-3 col-md-6 col-sm-12" v-for="result in searchResults" :key="result.id">

                        <img :key="image" :src="`http://localhost:3000/images/${result.images}`" :alt="result.productname"
                            class="product-image">
                        <div class="product card-body text-center">
                            <p class="card-name">{{ result.productname }}</p>
                            <p class="card-price">{{
                                parseInt(result.price.replace(/\s/g, '')).toLocaleString('vi-VN') }} &#8363;</p>


                            <div class="icon-hover d-flex">
                                <div class="icon-eye" @click="viewProduct">
                                    <router-link :to="{ name: 'DetailProduct', params: { id: result._id } }"
                                        class="nav-link">
                                        <i class="bi bi-eye"></i>
                                    </router-link>
                                </div>
                                <div class="icon-cart" @click="addToCart(result)">
                                    <i class="bi bi-cart"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>




    </div>

    <div v-else class="container card-notfound">

        <div class="card">
            <img src="/img/notfound.png" class="card-img-top image-notfound mx-auto" alt="...">
            <div class="card-body">
                <p>Không tìm thấy kết quả nào cho "<span class="search-keyword">{{ searchkey }} </span>" !</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '@/services/product.service';

export default {
    name: 'Search',

    data() {
        return {
            searchResults: [],
            searchkey: '', // tu khoa tim kiem
        };
    },

    mounted() {
        const searchQuery = this.$route.query.search;

        this.searchProducts(searchQuery);

        this.searchkey = searchQuery;
        // Thực hiện tìm kiếm dựa trên searchQuery và cập nhật searchResults

    },

    methods: {
        async searchProducts(searchQuery) {
            const formData = new FormData();
            formData.append('searchProduct', searchQuery);

            try {
                const response = await ProductService.searchProduct(formData);
                this.searchResults = response;

                // Cập nhật biến searchkey
                this.searchkey = searchQuery;

            } catch (error) {
                console.error(error);
            }

        },
    },

    watch: {
        '$route.query.search'(newSearchQuery, oldSearchQuery) {
            if (newSearchQuery !== oldSearchQuery) {
                this.searchProducts(newSearchQuery);
            }
        },
    }
}
</script>

<style scoped>
.search-keyword {
    font-weight: bold;
}

.search-result {
    justify-content: center;
}

.product-image,
.image-notfound {
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
    /* background-color: #e9d8f4; */
    background-color: #f3eaea;
}

li p {
    display: block;
    color: black;
    padding: 8px 16px;
    text-decoration: none;
}

/* Thay đổi màu liên kết khi di chuột qua */
li p:hover {
    background-color: #db7093;
    font-weight: bold;
    color: white;
}

.active-category {
    background-color: #58257b;
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

.card-notfound {
    padding: 20px;
}

.search {
    margin: 30px 0;
}
</style>