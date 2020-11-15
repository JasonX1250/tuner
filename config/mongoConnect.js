const mongoose = require("mongoose");
const url = "mongodb+srv://Alex:wrdad434@cluster0.yagjq.mongodb.net/UserDB?retryWrites=true&w=majority";
const getUsr = require('../config/models/user.js');
const userSchema = getUsr.getUser();
const User = mongoose.model('User', userSchema);
async function run() {
    try {
        await mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true });
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    // finally {
    //     await mongoose.connection.close();
    // }
}

run();
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  const testUsr = new User({username:'test'});
  testUsr.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log("added");
  });
});
