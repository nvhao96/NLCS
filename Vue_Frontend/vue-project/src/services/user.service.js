import createApiClient from "./api.services";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }

    async getAllUsers() {
        return (await this.api.get('/')).data;
    }

    async findOneUser(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateUser(id, formData) {
        return (await this.api.put(`/${id}`, formData)).data;
    }


}

export default new UserService();