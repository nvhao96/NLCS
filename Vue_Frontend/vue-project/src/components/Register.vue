<template>
    <div class="container" id="container">
        <div class="form-container sign-in">
            <form class="mt-3">
                <h3>Đăng Ký</h3>
                <input class="input-field" v-model="fullname" type="text" placeholder="Họ tên">

                <input class="input-field" v-model="email" type="email" placeholder="Email">

                <div class="input-container">
                    <input :type="inputType" v-model="password" class="input-field" name="password" placeholder="Mật khẩu">
                </div>

                <input class="input-field" v-model="address" type="text" placeholder="Địa chỉ">
                <input class="input-field" v-model="phone" type="text" placeholder="Số điện thoại">

                <div class="d-flex">
                    <input @click="togglePasswordVisibility" type="checkbox" value="" class=" showpass">
                    <label> Hiển thị mật khẩu</label><br>
                </div>

                <button @click="submitRegister">Đăng Ký</button>

                <h6 class="register">Bạn đã có tài khoản? Đăng nhập<router-link to="/login"><span class="register-here">
                            tại
                            đây</span></router-link></h6>

                <router-link to="/">
                    <p class="comeback"><i class="bi bi-arrow-left-short"></i> trở về trang chủ</p>
                </router-link>
            </form>

        </div>

        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-right">
                    <h1>Hasagi</h1>
                    <h2>XIN CHÀO QUÝ KHÁCH</h2>
                </div>
            </div>
        </div>
    </div>


    <div v-if="showError" class="error-message alert alert-danger" role="alert">
        {{ Error }}
    </div>
</template>

<script>


import axios from 'axios';

export default {

    data() {
        return {
            fullname: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            Error: 'Vui lòng nhập đầy đủ thông tin!',
            showError: false,
            successMessage: '',
            showPassword: false,
            inputType: 'password',


        };
    },

    methods: {

        togglePasswordVisibility() {

            this.showPassword = !this.showPassword;
            this.inputType = this.showPassword ? 'text' : 'password';
        },


        submitRegister(event) {
            event.preventDefault();

            // Khai báo và gán giá trị ban đầu cho biến error

            // Kiểm tra nhập đủ thông tin và định dạng email và số điện thoại
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;

            // kiem tra nhap day du thong tin

            if (this.fullname === '' && this.email === '' && this.password === '' && this.address === '' && this.phone === '') {
                this.showError = true;
            }
            else if (this.fullname === '') {
                this.Error = 'Vui lòng nhập họ tên!';
                this.showError = true;
            }
            else if (this.email === '') {
                this.Error = 'Vui lòng nhập Email!';
                this.showError = true;
            }
            else if (!emailRegex.test(this.email)) {
                this.Error = 'Email không hợp lệ Vui lòng nhập đúng định dạng Email';
                this.showError = true;
            }
            else if (this.password === '') {
                this.Error = 'Vui lòng nhập mật khẩu!';
                this.showError = true;
            } else if (this.address === '') {
                this.Error = 'Vui lòng nhập địa chỉ!';
                this.showError = true;
            } else if (this.phone === '') {
                this.Error = 'Vui lòng nhập số điện thoại!';
                this.showError = true;
            }
            else if (!phoneRegex.test(this.phone)) {
                this.Error = 'Số điện thoại không hợp lệ!';
                this.showError = true;
            }
            else {
                this.showError = false;
                axios.post('http://localhost:3000/api/register',
                    {
                        fullname: this.fullname,
                        email: this.email,
                        password: this.password,
                        address: this.address,
                        phone: this.phone
                    })

                    .then(response => {

                        if (response.status === 200) {
                            alert('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
                            this.$router.push('/login');
                        }

                        else {
                            console.error('Error:', response.status);
                        }

                    })
                    .catch(error => {
                        console.error('Error:', error);

                        if (error.response.status === 400) {
                            this.Error = error.response.data.message;
                            // alert('Tài khoản đã tồn tại');
                            // this.$router.push('/register');
                            // this.fullname = '';
                            // this.email = '';
                            // this.password = '';
                            // this.address = '';
                            // this.phone = '';

                        }

                        else {
                            // alert('Lỗi không xác định. Vui lòng thử lại sau!');
                            // console.error('Error:', error);
                            this.Error = ('Lỗi không xác định. Vui lòng thử lại sau!');
                        }
                        this.showError = true;
                    })

            }
        },


    }
}

</script>

<style scoped>
.showpass {
    cursor: pointer;
}

.container {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin-top: 50px;
}

.container button {
    background-color: #04AA6D;

    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button:hover {
    opacity: 0.8;
}


.container form {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container .input-field {
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in {
    left: 0;
    width: 50%;
    z-index: 2;
}



.toggle-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 30px 0 0 30px;
    z-index: 1000;
    font-family: Arial, Helvetica, sans-serif;
}

.toggle {

    background-image: url("/img/register.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    color: #fff;
    position: relative;
    /* left: -100%; */
    height: 100%;
    width: 100%;
    text-align: center;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;

}

/* hello */
.toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-panel h1 {
    position: absolute;
    top: 64px;
    right: 105px;
    color: #326e51
}

.toggle-panel h2 {
    position: absolute;
    top: 230px;
    right: 90px;
    width: 200px;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #888888;
    color: #000;

}

.toggle-right {
    right: 0;
    transform: translateX(0);
}


.register {
    margin-top: 15px;
}

h6 {
    color: grey;
    font-size: small;
    font-weight: 700;
}

.register-here {
    color: #326e51;
    text-decoration: underline;
}



.input-container {
    position: relative;
    display: inline-block;
    display: -ms-flexbox;
    /* IE10 */
    display: flex;
    width: 100%;
}

.error-message {
    color: red;
    margin-top: 30px;
    margin-left: 350px;
    width: fit-content;
}

.comeback {
    margin-top: 8px;
}

.input-field:focus {
    border: 2px solid #326e51;
}
</style>