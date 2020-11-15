var mongodb = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://<test>:<wrdad434>@cluster0.yagjq.mongodb.net/<UserDB>?retryWrites=true&w=majority";
const InitiateMongoServer = async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true , useUnifiedTopology : true
    }).then(
    () => {console.log("bla")},
    err => {console.log(err)});
    console.log("Connected to DB !!");
  } 

module.exports = InitiateMongoServer;

