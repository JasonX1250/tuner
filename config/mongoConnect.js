const mongoose = require("mongoose");
const url = "mongodb+srv://Alex:wrdad434@cluster0.yagjq.mongodb.net/UserDB?retryWrites=true&w=majority";
// const client = new MongoClient(url);
async function run() {
    try {
        await mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true });
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await mongoose.connection.close();
    }
}

run().catch(console.dir);