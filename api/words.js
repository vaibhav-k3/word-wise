const express = require('express')
const db_config = require('../config/db_config')
const errors = require('../config/errors')

const router = express.Router()

// get single word details from DB
router.get('/word/:word', async(req, res)=>{
    const requestedWord = req.params['word']
    try {
        const wordModel = db_config.wordModel
        const word = await wordModel.findOne({Word:requestedWord}).exec()
        const response = word === null ? res.status(400).json(errors.WORD_FETCH_ERROR) : res.json(word)
        return response
    }
    catch{
        res.status(400).json(errors.WORD_FETCH_ERROR)
    }

})
// get all words of a particular difficulty
router.get('/allWords', async(req, res)=>{
    try {
        const category = req.query.category
        const wordModel = db_config.wordModel
        const words = await wordModel.find({Difficulty:category}).exec()
        const response = words.length <= 0 ? res.status(400).json(errors.WORD_FETCH_ERROR) : res.json(words)
        return response
    }
    catch(err){
        res.status(400).send(err)
    }

})

module.exports = router