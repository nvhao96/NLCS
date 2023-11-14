<template>
    <div class="container">
        <div class="row product">
            <h3>Cập nhật sản phẩm</h3>

            <div class="col-lg-3 col-md-3 col-sm-3"></div>

            <div class="col-lg-6 col-md-6 col-sm-6">
                <div v-if="showError" class="container error-message alert alert-danger" role="alert">
                    {{ error }}
                </div>

                <form class="justity-content-center align-items-center" enctype="multipart/form-data"
                    @submit="updateProduct($event, productId)">
                    <div class="mb-3 form-group">
                        <label for="exampleFormControlSelect1" class="title-product">Danh Mục:</label>
                        <select class="form-select" id="exampleFormControlSelect1" v-model="category">
                            <option v-for="category in categories" :key="category.id"> {{ category.categoryname }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label title-product">Tên sản phẩm: </label>
                        <div class="name-product-input">
                            <input type="text" class="form-control" v-model="productname">
                        </div>

                    </div>
                    <div class="mb-3">
                        <label class="form-label title-product">Giá: </label>
                        <div class="price-product-input">
                            <input type="text" class="form-control" v-model="price">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label title-product">Số lượng: </label>
                        <div class="price-product-input">
                            <input type="text" class="form-control" v-model="Quantity">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label title-product">Mô tả: </label>
                        <textarea v-model="describe" class="form-control" id="exampleFormControlTextarea1" rows="6"
                            placeholder=""></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label title-product">Ghi chú: </label>
                        <textarea v-model="notes" class="form-control" id="exampleFormControlTextarea1" rows="2"
                            placeholder="Không bắt buộc"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label title-product">Hình Ảnh: </label>
                        <div class="category-product-input">
                            <input type="file" accept="image/*" name="imageURL" class="form-control"
                                @change="handleFileChange">

                            <img v-if="temporaryImageURL" :src="temporaryImageURL" alt="Product Image" class="image-file">
                            <img v-else-if="imageURL" :src="`http://localhost:3000/images/${imageURL}`" :alt="productname"
                                class="product-image">
                        </div>
                    </div>
                    <button type="submit" class=" btn save">Cập nhật</button>
                    <router-link to="/admin/products"><button class="cancel btn">Hủy</button></router-link>
                </form>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductService from '@/services/product.service';
import CategoryService from '@/services/category.service';

export default {

    name: 'admin-updateproduct',

    data() {
        return {
            productId: '',
            productname: '',
            price: 0,
            category: '',
            Quantity: '',
            describe: '',
            notes: '',
            categories: [],
            // doi 
            imageURL: null,

            // dang sai
            // imageURL: '',
            showError: false,
            error: 'Vui lòng nhập đầy đủ thông tin',
            temporaryImageURL: null


        };
    },

    mounted() {
        this.fetchgetNameCategorys()
    },

    created() {
        this.productId = this.$route.params.id;
        console.log("productId", this.productId);



        if (this.productId) {
            this.get(this.productId);
        }
    },

    methods: {
        handleFileChange(event) {
            // Lấy tệp tin từ sự kiện change



            const file = event.target.files[0];
            this.imageURL = file;
            console.log("file", file);
            this.temporaryImageURL = URL.createObjectURL(file);

        },


        async updateProduct(event, productId) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)

            if (this.productname === '' || this.price === '' || this.category === '' || this.describe === '' || this.Quantity === '') {
                this.showError = true;
            } else {
                this.showError = false;

                const formData = new FormData();
                formData.append('productname', this.productname);
                formData.append('price', this.price);
                formData.append('category', this.category);
                formData.append('imageURL', this.imageURL);
                formData.append('notes', this.notes);
                formData.append('Quantity', this.Quantity);
                formData.append('describe', this.describe);


                try {
                    const response = await ProductService.updateProduct(productId, formData);
                    if (response.status === 200) {
                        console.log("response", response);
                        alert("Cập nhật thành công");

                        this.$router.push('/admin/products');
                    } else {
                        console.log("response", response);
                        console.error('Error', response.message);
                        console.log(response.status);
                    }
                } catch (error) {
                    this.error = error.response.message;
                    this.showError = true;
                }





            }

        },




        async get(productId) {
            try {
                const response = await ProductService.findOneProduct(productId);
                console.log("data", response);
                this.productname = response.productname;
                const Price = response.price;
                this.price = Price;
                this.category = response.category;
                this.notes = response.notes;
                this.Quantity = response.Quantity;
                this.describe = response.describe;



                this.imageURL = response.images;
                console.log("HinhHangHoa", this.imageURL);


            } catch (error) {
                console.error(error);

            }
        },

        async fetchgetNameCategorys() {
            try {
                this.categories = await CategoryService.getNameCategorys();
            } catch (error) {
                console.error(error);
            }
        },


    }
}
</script>

<style scoped>
.error-message {
    color: red;
    margin-top: 10px;
}

.cancel {
    margin-left: 3px;
    color: red;
    font-weight: bold;
    background-color: rgb(250, 194, 174);
}

.save {
    color: rgb(20, 20, 255);
    font-weight: bold;
    background-color: rgb(179, 205, 255);
}


.product-image,
.image-file {
    width: 300px;
    height: 300px;
    margin-top: 5px;

}

.product {
    margin: 30px 0;
}

h3 {
    text-align: center;
    font-weight: bold;
}

.title-product {
    font-weight: bold;

}
</style>