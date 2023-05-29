const express = require("express")
const router = express.Router()

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
router.get('/getUser',(req,res)=>{
    res.json(DUMMY_USER)
})

module.exports = router
