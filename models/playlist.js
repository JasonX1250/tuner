const mongoose = require ("mongoose");
const User = require('../models/user');

const PlaylistSchema = new mongoose.Schema({
	title : String,
	user : [{type: Schema.Types.ObjectId, ref: 'User'}],
	author: String,
    link: String,
  	platform: String,
	media: [{
	    title : String,
	    author : String,
	    link : String
	}]
});

module.exports = mongoose.model("Playlist", PlaylistSchema);

