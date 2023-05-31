const mongoose = require('mongoose')

const schema = mongoose.Schema;

const UserSchema = new schema({
    _id: String,
    name: {
        type: String,
        unique: false,
        require: true
    },
    price: {
        type: Number,
        default: 0
    },
    brand: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    color: {
        type: String,
    },
    ram: {
        type: Number,
    },
    storage: {
        type: Number,
    }
},
    {
        _id: false,
        timestamps: true,
    },
)

module.exports = mongoose.model('product', UserSchema)