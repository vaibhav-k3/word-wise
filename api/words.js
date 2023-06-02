const express = require('express')
const db_config = require('../config/db_config')
const errors = require('../config/errors')

const router = express.Router()

// get single word details from DB
router.get('/word/:word', async (req, res) => {
    const requestedWord = req.params['word']
    try {
        const wordModel = db_config.wordModel
        const word = await wordModel.findOne({ Word: requestedWord }).exec()
        const response = word === null ? res.status(400).json(errors.WORD_FETCH_ERROR) : res.json(word)
        return response
    }
    catch {
        res.status(400).json(errors.WORD_FETCH_ERROR)
    }

})
// get all words of a particular difficulty
router.get('/allWords', async (req, res) => {
    try {
        const category = req.query.category
        const wordModel = db_config.wordModel
        const words = await wordModel.find({ Difficulty: category }).exec()
        const response = words.length <= 0 ? res.status(400).json(errors.WORD_FETCH_ERROR) : res.json(words)
        return response
    }
    catch (err) {
        res.status(400).send(err)
    }

})

// get words from set
router.get('/practice', async (req, res) => {
    try {
        const category = req.query.category
        const setno = parseInt(req.query.practiceset)
        const wordModel = db_config.wordModel
        const words = await wordModel.find({ Difficulty: category }).skip(setno - 1).limit(25).exec()
        const selectedWords = words.map((word => word['Word']))
        // Select random 100 words
        const optionsCandidate = await wordModel.aggregate([
            {
                $sample: { size: 100 }
            },
        ])
        // Make sure that the randomnly selected words are not the ones which are in the set
        const options = optionsCandidate.filter((option) => !(option.Word in selectedWords)).slice(0, 75)

        // just take the meaning attribute of the words
        const optionsMeaning = options.map((option) => option['Meaning'])

        // generate bundle of word meanings, each bundle consists of 3 words
        let meaningsBundled = []
        for (let i = 0; i < 75; i = i + 3) {
            meaningsBundled.push(optionsMeaning.slice(i, i + 3))
        }
        
        // Add the meaning bundles as "options" in the selected word to form the question
        const questions = words.map((word, index) => 
                                    { return { Word: word.Word, 
                                            Meaning: word.Meaning, 
                                            Sentence: word.Sentence, 
                                            options: meaningsBundled[index],
                                            Difficulty:word.Difficulty } })
        // Return the question
        const response = words.length <= 0 ? res.status(400).json(errors.WORD_FETCH_ERROR) : res.json(questions)
        return response
    }
    catch (err) {
        res.status(400).send(err)
    }

})

module.exports = router

sample_doc = {
    "_id": "6474e24bee76df6cc3e992fa",
    "Serial Number": 1,
    "Word": "upbraid",
    "Meaning": "to scold",
    "relatedWords": "reproach, admonish, reprove",
    "Sentence": "He was upbraided for his untidy appearance.",
    "Difficulty": "Easy",
    "option": [
        "meaning1",
        "meaning2",
        "meaning3"
    ]
}