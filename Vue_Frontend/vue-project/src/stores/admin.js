import { defineStore } from "pinia";

export const useAdminStore = defineStore('admin', {
    state() {
        return {
            isAdminLoggedIn: false,
            role: '',
            adminId: '',
            adminname: ''
        };
    },
    actions: {
        login(isAdminLoggedIn, role, adminId, adminname) {
            // Lưu thông tin đăng nhập vào localStorage
            localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn.toString());
            localStorage.setItem('role', role);
            localStorage.setItem('adminId', adminId);
            localStorage.setItem('adminname', adminname);

            // Cập nhật state của store
            this.isAdminLoggedIn = isAdminLoggedIn;
            this.role = role;
            this.adminId = adminId;
            this.adminname = adminname;
        },
        logout() {
            // Xóa thông tin đăng nhập khỏi localStorage
            localStorage.setItem('isAdminLoggedIn', null);
            localStorage.removeItem('role');
            localStorage.removeItem('adminId');
            localStorage.removeItem('adminname');

            // Đặt lại state của store
            this.isAdminLoggedIn = false;
            this.role = '';
            this.adminId = '';
            this.adminname = '';
        }
    },

});
