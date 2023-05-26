const express = require("express")
const app = express()
const userRouter = require('./api/users')

const logger = (req, res, next) => {
    console.log("request received")
    next()
}
app.use(logger)
app.use('/api/users',userRouter)

app.listen(5000)