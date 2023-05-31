import createService from './api.service'

class UserService {
    constructor(baseUrl = '/api/user') {
        this.api = createService(baseUrl)
    }

    async findAllUsers() {
        return (await this.api.get('/')).data
    }

    async createUser(data) {
        return (await this.api.post('/', data)).data
    }

    async deleteAllUsers() {
        return (await this.api.delete('/')).data
    }

    async findOneUser(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async updateUser(id, data) {
        return (await this.api.put(`/${id}`, data)).data
    }

    async deleteUser(id) {
        return (await this.api.delete(`${id}`)).data
    }
}

export default new UserService()