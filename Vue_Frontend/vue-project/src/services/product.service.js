import createApiClient from "./api.services";

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }

    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }

    async getAllProducts() {
        return (await this.api.get('/')).data;
    }

    async deleteProduct(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async updateProduct(id, formData) {
        return (await this.api.put(`/${id}`, formData)).data;
    }

    async findOneProduct(id) {
        return (await this.api.get(`/${id}`)).data;
    }


    async findProductByCategory(categoryname, product) {
        return (await this.api.get(`/category/${categoryname}/${product}`)).data;
    }

    async searchProduct(formData) {
        return (await this.api.post(`/search`, formData)).data;
    }
}

export default new ProductService();