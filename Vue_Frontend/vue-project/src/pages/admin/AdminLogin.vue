<template>
    <div class="container" id="container">
        <div class="form-container sign-in">
            <form>
                <h3>Đăng Nhập ADMIN</h3>
                <input class="input-field" v-model="email" type="email" placeholder="Email">
                <div class="input-container">
                    <input class="input-field" v-model="password" :type="inputType" placeholder="Mật khẩu" name="psw">
                </div>
                <div class="d-flex">
                    <input @click="togglePasswordVisibility" type="checkbox" value="" class=" showpass">
                    <label> Hiển thị mật khẩu</label><br>
                </div>


                <button @click="submitForm">Đăng Nhập</button>


                <router-link to="/">
                    <p class="comeback"><i class="bi bi-arrow-left-short"></i> trở về trang chủ</p>
                </router-link>
            </form>

        </div>

        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-right">
                    <h1 class="color">ADMIN</h1>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '../../stores/admin';


export default {
    name: 'adminlogin',

    setup() {
        const router = useRouter();
        const adminAuth = useAdminStore();
        const email = ref('');
        const password = ref('');
        const Error = ref('Vui lòng nhập đầy đủ thông tin');
        const showError = ref(false);
        const showPassword = ref(false);
        const inputType = ref('password');

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
            inputType.value = showPassword.value ? 'text' : 'password';
        };

        const submitForm = (event) => {
            event.preventDefault();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.value === '' && password.value === '') {
                showError.value = true;
            }
            else if (email.value === '') {

                Error.value = "Vui lòng nhập Email!";
                showError.value = true;
            }
            else if (!emailRegex.test(email.value)) {
                Error.value = "Vui lòng nhập đúng định dạng Email";
                showError.value = true;
            }
            else if (password.value === '') {
                Error.value = "Vui lòng nhập Mật khẩu";
                showError.value = true;
            }

            else {
                showError.value = false;

                axios
                    .post('http://localhost:3000/api/login/admin', {
                        email: email.value,
                        password: password.value
                    })
                    .then(response => {
                        if (response.data.status === 200) {
                            alert("Đăng nhập thành công!");

                            const adminId = response.data.payload.id;
                            const role = response.data.payload.role;
                            const adminname = response.data.payload.adminname;
                            adminAuth.login(true, role, adminId, adminname);
                            // localStorage.setItem('isLoggedIn', 'true');
                            // localStorage.setItem('role', role);
                            // localStorage.setItem('adminId', adminId);
                            // localStorage.setItem('adminname', adminname);

                            router.push('/admin/home');
                            console.log(response);

                        }

                    })
                    .catch(error => {
                        if (error.response && error.response.status === 400) {
                            Error.value = error.response.data.message;
                        } else if (error.response && error.response.status === 404) {
                            Error.value = error.response.data.message;
                        }
                        else {
                            Error.value = 'Lỗi không xác định. Vui lòng thử lại sau';
                        }
                        showError.value = true;
                    });
            }
        };

        return {
            email,
            password,
            Error,
            showError,
            showPassword,
            inputType,
            togglePasswordVisibility,
            submitForm
        };
    }
};

</script>

<style scoped>
.showpass {
    cursor: pointer;
}

.color {
    position: absolute;
    right: 120px;
    top: 85px;
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

.container p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container button {
    background-color: #326e51;
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

    background-image: url("/img/admin.jpg");
    /* background-repeat: no-repeat; */
    background-size: 100%;
    color: #fff;
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

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
    margin-top: 20px;
}

.input-field:focus {
    border: 2px solid #326e51;
}
</style>