const express = require("express")
const app = express()
const userRouter = require('./api/users')
const wordsRouter = require('./api/words')
const logger = (req, res, next) => {
    console.log("request received")
    next()
}
app.use(logger)
app.use('/api/users',userRouter)
app.use('/api/words',wordsRouter)
app.listen(5000)