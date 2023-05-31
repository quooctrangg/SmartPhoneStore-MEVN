import createService from './api.service'

class productService {
    constructor(baseUrl = '/api/bill') {
        this.api = createService(baseUrl)
    }

    async findAllBills() {
        return (await this.api.get('/')).data
    }

    async createBill(data) {
        return (await this.api.post('/', data)).data
    }

    async deleteAllBills() {
        return (await this.api.delete('/')).data
    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async updateBill(id, data) {
        return (await this.api.put(`/${id}`, data)).data
    }

    async deleteBill(id) {
        return (await this.api.delete(`/${id}`)).data
    }

    async findByUserId(idUser) {
        return (await this.api.get(`/user/${idUser}`)).data
    }

    async findByCodeStatus(codestatus) {
        return (await this.api.get(`/code/${codestatus}`)).data
    }
}

export default new productService()