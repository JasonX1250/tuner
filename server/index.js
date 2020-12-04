"use strict";
const connectDB = require("../config/mongoConnect");
connectDB();
const path = require("path");
const express = require("express");
const app = express();
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');
require("../config/passport.js")(passport);
const router = require("../server/routes");

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));
app.use("/startQuery", express.static(path.join(__dirname, "../client/StartPlatformQuery")));
app.use("/startQueryResults", express.static(path.join(__dirname, "../client/StartPlatformQueryResults")));
app.use("/selectEndPlatforms", express.static(path.join(__dirname, "../client/SelectEndPlatform")));
app.use("/convertedMedia", express.static(path.join(__dirname, "../client/EndPlatformConvertedResults")));
// app.use("/playlistQuery", express.static(path.join(__dirname, "../client/SpecifyPlaylistsToAddTo")));
app.use("/addToPlaylists", express.static(path.join(__dirname, "../client/SelectPlaylistsToAddTo")));
app.use("/addToPlaylistsResults", express.static(path.join(__dirname, "../client/AddToPlaylistResult")));
app.use("/login", express.static(path.join(__dirname, "../client/Login")));
app.use("/savedPlaylists", express.static(path.join(__dirname, "../client/SavedPlaylists")));
app.use("/browsePlaylist", express.static(path.join(__dirname, "../client/BrowsePlaylist")));
app.use("/register", express.static(path.join(__dirname, "../client/Register")));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});
