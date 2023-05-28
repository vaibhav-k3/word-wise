// const express = require("express")
// const mongoose = require("mongoose")
// const app = express()
// const userRouter = require('./api/users')
const db_connection_string = 'mongodb+srv://dev_user:123%40456ABC@atlascluster.a7fbggj.mongodb.net/'
// const logger = (req, res, next) => {
//     console.log("request received")
//     next()
// }
// app.use(logger)
// app.use(express.json());
// app.use('/api/users',userRouter)

// const start = async () => {
//     try {
//       await mongoose.connect(
//         db_connection_string
//       );
//         app.listen(3000, () => console.log("Server started on port 3000"));
//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }
//   };
  
// start();
// require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(db_connection_string, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.error.bind(console, 'MongoDB connection error:')
})
db.on("open", () => {
  console.log("database running successfully");
})

const Person = mongoose.model("word", new mongoose.Schema({
  Word: String,
  Meaning: String,
  Sentence: String
}),'word'
)

const createManyDocuments = async () =>{
   try {
    await Person.deleteMany({});    
    let persons = await Person.create(
     [
        {   
          name: "Theodore",
          title: "MERN Stack Developer",
          commit: 1000
        },
        {   
          name: "Chidera",
          title: "Network Administrator",
          commit: 1000
        },
        {
          name: "Elijah",
          title: "Backend Developer",
          commit: 200
        },
        {
          name: "Emeka",
          title: "Web Developer",
          commit: 500
        }
      ]
    )
    return persons
  }
  catch (error) {
    throw error
  }
}
app.get("/", async (req, res) => {
  let persons = await createManyDocuments();
  res.json({documents: persons});
});

app.get("/getword", async (req, res)=>{
  try{

      let singlePerson = await Person.findOne({});
      return res.json(singlePerson);
  }catch(error){
    throw error
  }
})

app.get('/commits', async (req, res)=>{
  try{
    if(req.query.from && req.query.to){
      let from = req.query.from;
      let to = req.query.to;
      let singlePerson = await Person.find({commit: {$gte:from , $lte:to}}).exec();

      res.json(singlePerson)
    }else{
      res.json({error: "No from and to query parameters found"})
    }
  }catch(error){
    throw error
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});