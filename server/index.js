"use strict";
const mongoose = require("mongoose");
const connectDB = require("../config/mongoConnect");
connectDB();
const path = require("path");
const express = require("express");
const app = express();
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');
require("../config/passport.js")(passport);
const User = require('../models/user');
const router = require("../server/routes");

var fs = require('fs');
var readline = require('readline');

const db = mongoose.connection;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));
app.use("/startQuery", express.static(path.join(__dirname, "../client/StartPlatformQuery")));
app.use("/startQueryResults", express.static(path.join(__dirname, "../client/StartPlatformQueryResults")));
app.use("/selectEndPlatforms", express.static(path.join(__dirname, "../client/SelectEndPlatform")));
app.use("/convertedMedia", express.static(path.join(__dirname, "../client/EndPlatformConvertedResults")));
app.use("/playlistQuery", express.static(path.join(__dirname, "../client/SpecifyPlaylistsToAddTo")));
app.use("/addToPlaylists", express.static(path.join(__dirname, "../client/SelectPlaylistsToAddTo")));
app.use("/addToPlaylistsResults", express.static(path.join(__dirname, "../client/AddToPlaylistResult")));
app.use("/login", express.static(path.join(__dirname, "../client/Login")));
app.use("/savedPlaylists", express.static(path.join(__dirname, "../client/SavedPlaylists")));

//moved endpoints to routes.js
app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});

// app.get("/queryMedia", (req, res) => {
//     const platform = req.query.platform;
//     const queryMethod = req.query.queryMethod;
//     console.log(req.query);
//     res.send(ex1);
// });

// app.get("/queryPlaylists", (req, res) => {
//     const platform = req.query.platform;
//     const queryMethod = req.query.queryMethod;
//     console.log(req.query);
//     res.send(ex1);
// });

// app.get("/getSavedPlaylists", (req, res) => {
//     const userId = req.query.userId;
//     console.log(req.query);
//     res.send(ex2);
// });

// app.post("/convertMedia", (req, res) => {
//     const platform = req.body.platform;
//     const mediaToConvert = req.body.media;
//     console.log(req.body);
//     res.send(ex1);
// });

// app.post("/newPlaylist", (req, res) => {
//     const userId = req.body.userId;
//     const auth = req.body.auth;
//     const platform = req.body.platform;
//     const playlistDetails = req.body.details;
//     console.log(req.body);
//     res.send([{ title: "Title YZ0", author: "Author YZ0", duration: "85:00", link: "link.com/yz0" }]);
// });

// app.post("/addToPlaylists", (req, res) => {
//     const userId = req.body.userId;
//     const auth = req.body.auth;
//     const media = req.body.media;
//     const playlists = req.body.playlists;
//     console.log(req.body);
//     const ex = [];
//     for (const p of playlists) {
//         ex.push("success");
//     }
//     res.send(ex);
// });

// app.post("/savePlaylist", (req, res) => {
//     const userId = req.body.userId;
//     const auth = req.body.auth;
//     const title = req.body.title;
//     const media = req.body.media;
//     console.log(req.body);
//     res.send( {playlistId: "examplePlaylistId"} );
// });

// app.post("/getAuth", (req, res) => {
//     const accessToken = req.body.accessToken;
//     console.log(req.body);
//     res.send({
//         userId: "exampleUserId",
//         authToken: "exampleAccessToken"
//     });
// });

// app.post("/login", passport.authenticate('local',{
//     sucessRedirect : '/SavedPlaylists',
//     failureRedirect : '/login'
// }));

// app.delete("/deleteSavedPlaylist", (req, res) => {
//     const userId = req.body.userId;
//     const auth = req.body.auth;
//     const playlistId = req.body.playlistId;
//     console.log(req.body);
//     res.send("success");
// });
