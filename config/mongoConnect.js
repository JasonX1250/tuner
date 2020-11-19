const mongoose = require("mongoose");
const url = "mongodb+srv://Alex:wrdad434@cluster0.yagjq.mongodb.net/UserDB?retryWrites=true&w=majority";
const User = require('../models/user');

const connectDB = async() => {
	 try {
	    await mongoose.connect(url, {
	      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
	    });
	     console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = connectDB;
