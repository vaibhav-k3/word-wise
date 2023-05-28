const express = require("express")
// const {wordModel} = require("../config/db_config.js")
const mongoose = require("mongoose")
// const { model, connection } = require("mongoose")
const router = express.Router()
const wordSchema = new mongoose.Schema({
    Word: String,
    Meaning: String,
    Sentence: String
  })

const wordModel = mongoose.model('word',wordSchema,'word')

console.log()
DUMMY_USER = {
    'userName':'test',
    'userPassword':'Pass',
    'words' : ['capricious', 'irate','cajole'],
    'test_scores':[
        {
            'test_type':'Revision',
            'date': Date('2023-01-01'),
            'score': {
                'easy':3,
                'medium':4,
                'hard':10
            }
        },
        {
            'test_type':'Revision',
            'date': Date('2023-01-01'),
            'score': {
                'easy':3,
                'medium':4,
                'hard':10
            }
        }
    ]
}
router.get('/getUser', async (req,res)=>{
    result = {}
    const response = await wordModel.find({})
    res.send(response)
})

module.exports = router
