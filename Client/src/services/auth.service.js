import createService from './api.service'

class authService {
    constructor(baseUrl = '/api/auth') {
        this.api = createService(baseUrl)
    }

    async register(data) {
        return (await this.api.post('/register', data)).data
    }

    async updateUser(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data
    }

    async login(data) {
        return (await this.api.post('/login', data)).data
    }

    async logout() {
        return (await this.api.post('/logout')).data
    }

    async refresh(data) {
        return (await this.api.post('/refresh', data)).data
    }
}

export default new authService()