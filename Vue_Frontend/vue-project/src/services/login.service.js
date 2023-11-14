import createApiClient from "./api.services";

class LoginService {
    constructor(baseUrl = "/api/login") {
        this.api = createApiClient(baseUrl);
    }

    async getAllUsers() {
        return (await this.api.get('/')).data;
    }


}

export default new LoginService();