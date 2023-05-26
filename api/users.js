const express = require("express")
const router = express.Router()

DUMMY_USER = {
    'userName':'test',
    'userPassword':'Pass'
}
router.get('/getUser',(req,res)=>{
    res.json(DUMMY_USER)
})

module.exports = router