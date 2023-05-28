const mongoose = require('mongoose');
const db_connection_string = 'mongodb+srv://dev_user:123%40456ABC@atlascluster.a7fbggj.mongodb.net/'
const wordSchema = new mongoose.Schema({
    "Serial Number": Number,
    "Word": String,
    "Meaning": String,
    "Words with similar meanings": String,
    "Sentence": String
  })
// const connectDB =  () => {
//     const wordSchema = mongoose.Schema({
//         "Serial Number": mongoose.SchemaTypes.Number,
//         "Word": String,
//         "Meaning": String,
//         "Words with similar meanings": String,
//         "Sentence": String,
//         "_id": mongoose
//         .Schema.Types.ObjectId
//       })
//     try {
//         const conn =  mongoose.createConnection(db_connection_string);
//         // console.log(`Mongo db connected: ${conn.connection.host}`);
//         const wordModel = conn.model('words',wordSchema,'words')
//         return wordModel ;
//     } catch (error) {
//         console.log("asdasdasdasdasd")
//         console.log(error);
//         process.exit(1);
//     }
// };
// const start = async () => {
//     try {
//       await mongoose.connect(
//         db_connection_string
//       );
//     //   app.listen(3000, () => console.log("Server started on port 3000"));
//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }
//   };
  
// start();
const wordModel = mongoose.model('words',wordSchema,'words')
module.exports = {wordModel};