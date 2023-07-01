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

const userSchema = mongoose.Schema({
    userEmail:String,
    userPassword:String,
    firstName:String,
    lastName:String,
    DOB:String,
    gender:String
})
exports.userSchema = userSchema
exports.wordSchema = wordSchema