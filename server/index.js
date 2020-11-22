"use strict";
const mongoose = require("mongoose");
const connectDB = require("../config/mongoConnect");
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const expressSession = require('express-session');  // for managing session state
const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};
// const mc = new miniCrypt();
const passport = require('passport');
require("../config/passport.js")(passport);
const User = require('../models/user');
const router = require("../server/routes");

var fs = require('fs');
// var readline = require('readline');
// app.use(expressSession(session));
app.use(express.urlencoded({'extended' : true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

connectDB();




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
app.use("/register",express.static(path.join(__dirname, "../client/Register")));

app.use(router);



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});
