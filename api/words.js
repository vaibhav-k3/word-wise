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
        res.json(word)
    }
    catch{
        res.status(400).json(errors.WORD_FETCH_ERROR)
    }

})

module.exports = router