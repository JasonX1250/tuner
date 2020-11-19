const mongoose = require ("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  local : {
    username: String,
    hash: String,
    salt: String,
  },
  google: {
    id: String,
    token: String,
    rfreshToken: String
    // channel: String // user channel need verification
  },
  spotify: { 
    id: String,
    token: String,
    refreshToken: String
  },   
});

// UserSchema.plugin(uniqueValidator);
// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);


// playlists: [
//   {
//     title: {
//     type : String
//   },
//   author: {
//     type : String
//   },
//   link: {
//     type : String
//   },
//   platform: {
//     type : String
//   },
//   media: [
//     {
//       title : String,
//       author : String,
//       link : String
//     }]
//   }],
// const UserSchema = new mongoose.Schema({
//   local : {}
//   username: {
//     type: String,
//     lowercase: true,
//     sparse: true
//   },
//   hash: String,
//   salt: String,
//   google: {
//     id: String,
//     token: String,
//     rfreshToken: String
//     // channel: String // user channel need verification
//   },
//   spotify: { 
//     id: String,
//     token: String,
//     refreshToken: String
//   },
//   playlists: [
//   {
//     title: {
//     type : String
//   },
//   author: {
//     type : String
//   },
//   link: {
//     type : String
//   },
//   platform: {
//     type : String
//   },
//   media: [
//     {
//       title : String,
//       author : String,
//       link : String
//     }]
//   }],
       
// });
