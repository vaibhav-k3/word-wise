const mongoose = require('mongoose')
const Schema = require('./db_models')
const DATABASE_URI = 'mongodb+srv://dev_user:123%40456ABC@atlascluster.a7fbggj.mongodb.net/wordwisedb'
const connection = mongoose.createConnection(DATABASE_URI)

const wordModel = connection.model('words',Schema.wordSchema,'words')
const userModel = connection.model('users',Schema.userSchema,'users')

exports.wordModel =  wordModel
exports.userModel = userModel