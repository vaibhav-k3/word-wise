const mongoose = require('mongoose')
const wordSchema = mongoose.Schema({
    Word:String,
    Meaning:String,
    Sentence:String
})

exports.wordSchema = wordSchema