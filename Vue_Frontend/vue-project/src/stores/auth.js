import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {

    state() {
        return {
            isLoggedIn: false, //chua dang nhap
            token: '', // token ban dau
            userId: '', // Thêm thuộc tính userId
        };
    },
    actions: {
        setToken(token) {
            this.token = token;
        },

        clearToken() {
            this.token = '';
        },

        login(token, userId) {
            this.setToken(token);
            this.setUserId(userId); // Cập nhật giá trị userId
            this.isLoggedIn = true;
        },

        logout() {
            this.clearToken();
            this.userId = ''; // Xóa giá trị userId khi đăng xuất
            this.isLoggedIn = false;
        },

        setUserId(userId) { // Tạo hành động setUserId
            this.userId = userId;
        },


    },

})
