import createApiClient from "./api.services";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    async createOrder(data) {
        return (await this.api.post("/", data)).data;
    }

    async getAllOrders() {
        return (await this.api.get('/')).data;
    }

    async updateOrder(idorder, formData) {
        return (await this.api.put(`/${idorder}`, formData)).data;
    }

    async findOneOrder(id) {
        return (await this.api.get(`/${id}`)).data;
    }

}

export default new OrderService();