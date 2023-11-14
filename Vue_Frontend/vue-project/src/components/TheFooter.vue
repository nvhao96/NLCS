<template>
    <footer>
        <div class="footer1">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-4 col-md-4">

                        <div class="icon-info">

                            <ul>
                                <h5 class="title-footer">HASAGI</h5>

                                <!-- <li>
                                    <i class="bi bi-facebook"></i>
                                </li> -->
                                <li>
                                    <p class="text-footer"><span><i class="bi bi-geo-alt-fill"></i> Hưng Lợi, Ninh Kiều,
                                            Cần Thơ</span>
                                    </p>
                                </li>
                                <li>
                                    <p class="text-footer"><i class="bi bi-envelope-fill"></i> Hasagi@gmail.com</p>
                                </li>
                                <li>
                                    <p class="text-footer"><i class="bi bi-telephone-fill"></i> 0708970924</p>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div class="col-12 col-lg-4 col-md-4">

                        <div class="icon-info">

                            <ul>
                                <h5 class="title-footer">THÔNG TIN</h5>
                                <li>
                                    <router-link to="/" class="nav-link" @click="scrollToTop">
                                        <p class="text-footer ">TRANG CHỦ</p>
                                    </router-link>

                                </li>
                                <li>
                                    <router-link to="/product" class="nav-link" @click="scrollToTop">
                                        <p class="text-footer">SẢN PHẨM</p>
                                    </router-link>

                                </li>
                                <li>
                                    <router-link to="/contact" class="nav-link" @click="scrollToTop">
                                        <p class="text-footer">LIÊN HỆ</p>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/about" class="nav-link" @click="scrollToTop">
                                        <p class="text-footer">VỀ CHÚNG TÔI</p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>

                    </div>


                    <div class="col-12 col-lg-4 col-md-4">
                        <h5 class="title-footer">ĐĂNG KÝ NHẬN TIN</h5>
                        <p class="text-footer">
                            Lấy giao dịch mới nhất và khuyến mại đặc biệt. Nhập email của bạn và đăng ký để ký bản tin của
                            chúng tôi

                        </p>
                        <input type="text" placeholder="Nhập email của bạn">
                        <button type="submit" class="btn-footer">ĐĂNG KÝ</button>

                    </div>
                </div>

                <hr class="hr-footer">

                <div class="row icon-footer text-center">
                    <ul class="d-flex">
                        <li>
                            <i class="bi bi-facebook"></i>
                        </li>
                        <li>
                            <i class="bi bi-google"></i>
                        </li>
                        <li>
                            <i class="bi bi-instagram"></i>
                        </li>
                        <li>
                            <i class="bi bi-twitter"></i>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'TheFooter',

    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
</script>
<style scoped>
footer {
    background-color: #326e51;
    padding-top: 1.5cm;
    /* padding-bottom: 3cm; */
}

.icon-info ul li {
    display: block;
    margin-right: 10px;
    /* Tạo khoảng cách giữa các mục */
}

.title-footer,
.title-footer {
    color: white;
    font-weight: 700;
}

.icon-info li i,
.text-footer {
    color: rgb(67, 67, 67);
}

.hr-footer {
    color: white;
}

.icon-footer li,
.icon-info li {
    list-style: none;
}

.icon-footer li {
    float: left;

}

.icon-footer li i {
    color: rgb(67, 67, 67);
    padding: 13px;
    width: 55px;
    height: 55px;
    margin: 0 9px;

}

.icon-footer ul {
    display: flex;
    justify-content: center;

}
</style>