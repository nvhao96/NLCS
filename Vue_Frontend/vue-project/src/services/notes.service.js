import createApiClient from "./api.services";

class NoteService {
    constructor(baseUrl = "/api/notes") {
        this.api = createApiClient(baseUrl);
    }


    async findProductByNotes() {
        return (await this.api.get('/')).data;
    }


}

export default new NoteService();