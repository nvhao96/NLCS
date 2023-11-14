import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {

    state() {
        return {
            // cartItems: [],
            totalQuantity: 0, // so luong san pham trong gio hang
            selectedItems: [],
        };
    },
    actions: {
        setTotalQuantity(value) {
            this.totalQuantity = value;
        },

        addSelectedItem(item) {
            this.selectedItems.push(item);
        },
        removeSelectedItem(item) {
            const index = this.selectedItems.indexOf(item);
            if (index !== -1) {
                this.selectedItems.splice(index, 1);
            }
        },
        clearSelectedItems() {
            this.selectedItems = [];
        },

    },

    getters: {

        getTotalQuantity(state) {
            return state.totalQuantity;
        }

    },

})

