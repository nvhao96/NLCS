<template>
    <div class=" banner">

        <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/img/ad.jpg" class="d-block w-100 img-fluid" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="/img/ad1.jpg" class="d-block w-100 img-fluid" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="/img/ad2.jpg" class="d-block w-100 img-fluid" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

    </div>

    <div class="container noibat p-5 mt-5 pt-1">
        <h3 class="text-center title-category mt-5 text-white"><span class="title">DANH MỤC </span>SẢN PHẨM</h3>
        <div class="row ">
            <div class="col-lg-2 col-md-2 col-sm-2 image-category ">
                <img src="/img/damat.png" class="img-fuild  zoom append">
                <div class="centered ">Chăm sóc da mặt</div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 image-category">
                <img src="/img/trangdiem.png" class="img-fuild zoom append">
                <div class="centered ">Trang điểm</div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 image-category">
                <img src="/img/tocvadadau.jpg" class="img-fuild zoom append">
                <div class="centered ">Chăm sóc tóc và da đầu</div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 image-category">
                <img src="/img/cothe.jpg" class="img-fuild zoom append">
                <div class="centered ">Chăm sóc cơ thể</div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 image-category">
                <img src="/img/canhan.jpg" class="img-fuild zoom append">
                <div class="centered ">Chăm sóc cá nhân </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 image-category">
                <img src="/img/nuochoa.jpg" class="img-fuild zoom append">
                <div class="centered ">Nước hoa</div>
            </div>
        </div>
    </div>


    <div class="container">
        <h3 class="text-center title-category mt-5">MỘT SỐ SẢN PHẨM <span class="title"></span></h3>
        <div class="row">
            <div class=" list">
                <router-link :to="{ name: 'Product' }" @click="scrollToTop">
                    <p class="text-footer">Xem tất cả sản phẩm</p>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3" v-for="item in items" :key="item.id">
                <div class="card card-noibat mt-3" @click="viewProduct(item)">
                    <div class="card-image card-img">
                        <img :src="`http://localhost:3000/images/${item.images}`" class="product-image text-center">
                    </div>
                    <div class="card-content">
                    </div>
                </div>
            </div>
        </div>
    </div>


    <section id="services" class="services section-padding">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-header text-center pb-5 mt-5">
                        <h3><span class="title">DỊCH VỤ </span>CỦA CHÚNG TÔI</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="bi bi-headset icon-service"></i>
                            <h6 class="py-2">HỖ TRỢ TRỰC TUYẾN</h6>
                            <p class="card-text">Hỗ trợ khách hàng 24/24</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="bi bi-currency-dollar icon-service"></i>
                            <h6 class=" py-2">HOÀN TIỀN</h6>
                            <p class="card-text">100% trong vòng 3 ngày</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="bi bi-truck icon-service"></i>
                            <h6 class=" py-2">MIỄN PHÍ VẬN CHUYỂN</h6>
                            <p class="card-text">Giao hàng miễn phí toàn quốc</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="bi bi-gift icon-service"></i>
                            <h6 class=" py-2">BLACK FRIDAY</h6>
                            <p class="card-text">Giảm 10% vào mỗi thứ sáu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import NoteService from '@/services/notes.service';
import ProductService from '@/services/product.service';

export default {
    name: 'Home',

    data() {
        return {
            products: [],
            items: [],

        }
    },

    mounted() {
        // this.findProductByNotes();

        this.getAllProduct();

    },


    methods: {
        async getAllProduct() {
            try {
                const result = await ProductService.getAllProducts();
                this.items = this.getRandomElements(result, 8);

            } catch (error) {
                console.error(error);
            }
        },

        // async findProductByNotes() {
        //     try {
        //         const response = await NoteService.findProductByNotes(); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn

        //         this.products = this.getRandomElements(response, 4);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },

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

        viewProduct(product) {
            // Chuyển hướng đến trang chi tiết sản phẩm và truyền id của sản phẩm như một param
            this.$router.push({ name: 'DetailProduct', params: { id: product._id } });
        },


        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};
</script>

<style scoped>
p .text-footer:hover {
    text-decoration: #FF8E4D;

}

.card {
    width: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
}

.services {
    margin: 20px 0;
}

.services .card-body i {
    font-size: 50px;
    color: #326e51;

}

.services .card-body h6 {
    font-weight: 700;
}

.services .card-body p {
    color: rgb(111, 111, 111);
}

.card:hover i {
    color: white;
}

.card:hover p {
    color: white;
    /* color: #04AA6D; */
}

.card-body:hover p,
.card-body:hover h6,
.card-body:hover i {
    color: #326e51;
}

.card:hover {
    /* background-color: #04AA6D; */
    color: white;
}


.zoom {
    padding: 50px;
    /* background-color: green; */
    transition: transform .2s;
    /* Animation */
    width: 200px;
    height: 200px;
    margin: 0 auto;
}

.zoom:hover {
    transform: scale(1.5);
    /* (150% zoom)*/
}


.image-category {
    position: relative;
    text-align: center;
    color: black;
    font-weight: 600;
}

.centered {
    position: absolute;
    left: 63%;
    transform: translate(-50%, -50%);
    width: 194px;
}

.title-category,
.content-2 {
    margin-top: 20px;
}


.text-footer {
    color: #FF8E4D;
}


.card-noibat {
    width: 250px;
    height: 150px;
    /* background-color: #7FFFD4; */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    position: relative;
}

.card-img {
    /* position: absolute; */
    /* Đặt vị trí tuyệt đối cho hình ảnh */
    top: -20px;
    /* Điều chỉnh vị trí top để hình ảnh nổi ra bên ngoài */
    left: -20px;
    /* Điều chỉnh vị trí left để hình ảnh nổi ra bên ngoài */
    z-index: 1;
    /* Đặt chỉ số z để đảm bảo hình ảnh nổi lên trên card */


    /* position: relative; */
    height: 200px;
    width: 150px;
}

.card-img img {
    width: 60%;
    height: 98%;
    object-fit: cover;
    transition: transform 0.3s ease;
    position: absolute;
    justify-items: center;
    left: 20%;
    top: 4px;
}

.card-img:hover img {
    transform: scale(1.1);
}

.card-content {
    padding: 20px;
    /* z-index: 2; */
    /* Đặt chỉ số z để đảm bảo nội dung nằm phía trên hình ảnh */
}

.card-title {
    font-size: 24px;
    margin-bottom: 10px;
}

.card-text {
    font-size: 16px;
    color: #555555;
}

/* .title {
    color: #04AA6D;
} */

.img {
    height: 400px;
    width: 400px;
}

h3 {
    font-weight: bold;
}

.image-home {
    margin: 40px 0;
}

.image-home-2 {
    height: 400px;
    width: 500px;
}

.img-fluid {
    height: 350px;
}

.list {
    text-align: end;

}

.noibat {
    background-color: #FF8E4D;
    border-radius: 20px;
}

.append {
    width: 250px;
    height: 270px;
    border-radius: 70px;
}
</style>