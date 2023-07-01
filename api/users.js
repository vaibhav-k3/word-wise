const express = require("express")
const router = express.Router()
const db_config = require("../config/db_config")
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
const userExists =  async (userEmail)=>{
    const userModel = db_config.userModel
    const user = await userModel.exists({userEmail:userEmail}).exec()
    if (user === null){
        return false
    }
    else{
        return true
    }

}
router.get('/getUser',(req,res)=>{
    res.json(DUMMY_USER)
})

router.post('/signup', async (req, res) =>{
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
    console.log(req.body)
    console.log(userEmail,userPassword)
    let check = await userExists(userEmail)
    if (check){
        return res.status(401).json({
            "status":"user already Exists"
        })
    }
    else{
        const userModel = db_config.userModel
        const newUser = new userModel({userEmail:userEmail, userPassword:userPassword})
        await newUser.save()
        return res.status(200).json({
            "status":"user created"
        })
    }
})
router.post('/login', async (req, res) =>{
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
    let check = await userExists(userEmail)
    if (check){
        return res.status(200).json({
            "status":"user found"
        })
    }
    else{
        return res.status(401).json({
            "status":"user not found"
        })
    }
})

module.exports = router
