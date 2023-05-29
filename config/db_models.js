const mongoose = require('mongoose')
const wordSchema = mongoose.Schema({
    Word:String,
    Meaning:String,
    Sentence:String,
    relatedWords:String,
    Sentence:String,
    Difficulty:String,
    "Serial Number": mongoose.SchemaTypes.Number
})

exports.wordSchema = wordSchema