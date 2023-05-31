const express = require('express');
const cors = require('cors')
const ApiError = require('./utils/api-error')
const cookieParser = require('cookie-parser')

const path = require('path')
const authRouter = require('./routes/auth.router')
const userRouter = require('./routes/user.router')
const productRouter = require('./routes/product.router')
const billRouter = require('./routes/bill.router')

const app = express();

app.use('/public', express.static(path.join(__dirname, '../src/public')))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Smart Phone Store application"
    })
})

app.use('/api/auth/', authRouter)
app.use('/api/user/', userRouter)
app.use('/api/product/', productRouter)
app.use('/api/bill/', billRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'))
})

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;