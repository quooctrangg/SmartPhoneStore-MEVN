import createService from './api.service'

class productService {
    constructor(baseUrl = '/api/product') {
        this.api = createService(baseUrl)
    }

    async findAllProducts() {
        return (await this.api.get('/')).data
    }

    async uploadImg(image) {
        return (await this.api.postForm('/image', image)).data
    }

    async createProduct(data) {
        return (await this.api.post('/', data)).data
    }

    async deleteAllProduct() {
        return (await this.api.delete('/')).data
    }

    async findOneProduct(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async updateProduct(id, data) {
        return (await this.api.put(`/${id}`, data)).data
    }

    async deleteProduct(id) {
        return (await this.api.delete(`/${id}`)).data
    }

    async removeImg(filename) {
        return (await this.api.delete(`/image/${filename}`)).data
    }

    async removeAllImgs() {
        return (await this.api.delete(`/image`)).data
    }
}

export default new productService()