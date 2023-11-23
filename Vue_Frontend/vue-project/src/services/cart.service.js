import createApiClient from "./api.services";

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl);
    }

    async addToCart(data) {
        return (await this.api.post("/", data)).data;
    }

    async getCart(id) {
        console.log("check id", id);
        return (await this.api.get(`/${id}`)).data;
    }

    async deleteCart(userId, productId) {
        return (await this.api.delete(`/${userId}/${productId}`)).data;
    }

    async deleteAllCart(userId) {
        return (await this.api.delete(`/${userId}`)).data;
    }

    async updateCart(userId, productId, data) {
        return (await this.api.put(`/${userId}/${productId}`, { data })).data;
    }

}

export default new CartService();