import createApiClient from "./api.services";

class CategoryService {
    constructor(baseUrl = "/api/categorys") {
        this.api = createApiClient(baseUrl);
    }

    // async createCategory(formData) {
    //     return (await this.api.post("/", formData)).data;
    // }

    async createCategory(formData) {
        return (await this.api.post('/', formData)).data;
    }

    // async getNameCategorys() {
    //     console.log("check check", this.api)
    //     return (await this.api.get('/')).data;
    // }
    // async getNameCategorys() {
    //     return (await this.api.get('/api/products')).data;
    // }


    async findProduct(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async findAll() {
        return (await this.api.get()).data;
    }
}

export default new CategoryService();