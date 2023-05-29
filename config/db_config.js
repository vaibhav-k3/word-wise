const mongoose = require('mongoose')
const Schema = require('./db_models')
const DATABASE_URI = 'mongodb+srv://dev_user:123%40456ABC@atlascluster.a7fbggj.mongodb.net/wordwisedb'
const connection = mongoose.createConnection(DATABASE_URI)

const wordModel = connection.model('word',Schema.wordSchema,'word')

exports.wordModel =  wordModel