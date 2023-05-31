const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb")
})

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected to mongodb")
})

module.exports = mongoose;