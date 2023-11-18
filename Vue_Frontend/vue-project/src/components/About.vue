<template>
    <section class="about">
        <div class="banner-about">
            <img class="img-fuild" src="/img/about3.jpg" alt="Cinque Terre">
        </div>
    </section>

    <section class="about">
        <div class="heading text-center ">
            <h1>VỀ CHÚNG TÔI</h1>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <img src="/img/about2.jpg" class="about-image" alt="">
                    </div>
                </div>

                <div class="col-md-6">
                    <h3>CỬA HÀNG<span></span></h3>
                    <p>HASAGI Hasaki.vn là hệ thống cửa hàng mỹ phẩm chính hãng và dịch vụ chăm sóc sắc đẹp chuyên sâu với
                        hệ thống cửa hàng trải dài trên toàn quốc; và hiện đang là đối tác phân phối chiến lược tại thị
                        trường Việt Nam của hàng loạt thương hiệu lớn như: La Roche-Posay, Eucerin, L'oreal, Bioderma,
                        Klairs, Naris Cosmetics, Maybelline, Vichy, Skin1004, Cocoon, Australis, Cetaphil, Anessa, SVR,
                        Paula's Choice, Some By Mi, B.O.M, Vaseline, Sunplay, Silky Girl, Senka, Naruko, Angel's Liquid,
                        DHC, Simple, Bio-essence, Tsubaki, 3CE, BNBG, Laneige, Vacosi, Lemonade, Hatomugi, Avène, Silcot,
                        Neutrogena, Garnier, Mediheal, Timeless, Curél,...

                        Với phương châm "Chất lượng thật - Giá trị thật”, Hasaki.vn luôn nỗ lực không ngừng nhằm nâng cao
                        chất lượng sản phẩm & dịch vụ để khách hàng có được những trải nghiệm mua sắm tốt nhất. Toàn bộ sản
                        phẩm có ở Hasaki.vn đều được cam kết 100% chính hãng, đảm bảo nguồn gốc xuất xứ, có đầy đủ hóa đơn
                        mua hàng VAT và tem phụ Tiếng Việt, với mức giá luôn tốt hàng đầu thị trường trong mọi thời điểm.
                        Ngoài ra, Hasaki.vn và nhãn hàng cam kết bảo vệ hai lớp với mức đền bù 200% nếu phát hiện hàng giả,
                        trong đó 100% từ Hasaki và 100% từ nhà phân phối, văn phòng đại diện hãng tại Việt Nam..</p>
                </div>
            </div>
        </div>


        <div class="test">
            <div class="container about-content-two">
                <div class="row ">
                    <div class="col-md-6">
                        <h3>KHÁCH HÀNG ONLINE<span> VÀ DỊCH VỤ</span></h3>
                        <p>
                            Đối với khách hàng online, Hasaki.vn áp dụng GIAO NHANH 2H MIỄN PHÍ cho đơn hàng từ 90.000đ tại
                            các khu vực: Hồ Chí Minh - Hà Nội - Hải Phòng - Pleiku - Cà Mau - Tây Ninh - Long An - Vĩnh Long
                            - Phan Thiết - Đà Lạt - Long Xuyên - Bạc Liêu - Cao Lãnh - Nha Trang - Trà Vinh - Huế - Bến Tre
                            - Đăk Lắk - Đà Nẵng - Tiền Giang - Kiên Giang - Cần Thơ - Vũng Tàu - Bình Dương - Biên Hòa. Đơn
                            hàng từ 249.000đ, Hasaki.vn giao MIỄN PHÍ TOÀN QUỐC. </p>
                    </div>

                    <div class="col-md-6">
                        <div class="card">
                            <img src="/img/about.jpg" class="about-image" alt="">
                        </div>
                    </div>
                </div>
            </div>


        </div>


        <div class="container">
            <div class="row about-content-three">
                <div>
                    <h3>Một số hình ảnh về của hàng</h3>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <img src="/img/about4.jpg" class="img-fluid">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <img src="/img/about5.jpg" class="img-fluid">
                </div>
            </div>
        </div>

        <!-- <div class="banner-about">
            <img src="/img/about3.jpg" alt="Cinque Terre">
        </div> -->
    </section>
</template>

<script>

export default {
    name: 'About',


};
</script>

<style scoped>
.banner-about {
    position: relative;
    height: 380ppx;
}

.center {
    position: absolute;
    bottom: 8px;
    left: 16px;
    font-size: 40px;
    color: white;
    font-weight: bolder;
    text-align: center;
}


.banner-about img {
    width: 100%;
    padding: 20px;
    height: 175px;
}

/* .test {
    background-color: #04AA6D;
} */

.heading {
    margin: 30px 0;
}

.title-about {
    color: #04AA6D;
}

.about-content-two {
    margin-top: 40px;
    padding: 10px;
}

.about-content-three {
    margin-top: 20px;
    text-align: center;
}

.img-fluid {
    max-width: 100%;
    height: auto;
    width: 660px;
}
</style>