const express = require("express")
const app = express()
const userRouter = require('./api/users')

app.use('/api/users',userRouter)

app.listen(5000)