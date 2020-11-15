'use strict'
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
	userID: String,
	googleID: String,
    accessToken: String
})

module.exports = mongoose.model('userModel', UserModelSchema);