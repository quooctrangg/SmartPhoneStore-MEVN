const mongoose = require('mongoose')

const schema = mongoose.Schema;

const UserSchema = new schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true
    },
    numberphone: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default: 1,
    },
    linkimg: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219988.png'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema)