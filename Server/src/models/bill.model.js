const { Schema, model } = require('mongoose')

const BillSchema = new Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId
        },
        idAdmin: {
            type: Schema.Types.ObjectId
        },
        products: {
            type: Array
        },
        codestatus: {
            type: Number,
            default: 0
        },
        sumquantity: {
            type: Number
        },
        sumprice: {
            type: Number
        },
        approval: {
            type: Date
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model('bill', BillSchema)