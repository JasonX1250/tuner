"use strict";

const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

const exampleData = [
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link", platform: "YouTube" }
];

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

app.get("/queryMedia", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(exampleData);
});

app.get("/queryPlaylists", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(exampleData);
});

app.get("/getSavedPlaylists", (req, res) => {
    const userId = req.query.userId;
    console.log(req.query);
    res.send(exampleData);
});

app.post("/convertMedia", (req, res) => {
    const platform = req.body.platform;
    const mediaToConvert = req.body.media;
    console.log(req.body);
    res.send(exampleData);
});

app.post("/newPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const platform = req.body.platform;
    const playlistDetails = JSON.parse(req.body.details);
    console.log(req.body);
    res.send(exampleData);
});

app.post("/addToPlaylists", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const media = req.body.media;
    const playlists = req.body.playlists;
    console.log(req.body);
    res.send(["success", "success", "success", "success"]);
});

app.post("/savePlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const title = req.body.title;
    const media = req.body.media;
    console.log(req.body);
    res.send( {playlistId: "examplePlaylistId"} );
});

app.post("/getAuth", (req, res) => {
    const accessToken = req.body.accessToken;
    console.log(req.body);
    res.send({
        userId: "exampleUserId",
        authToken: "exampleAccessToken"
    });
});

app.delete("/deleteSavedPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const playlistId = req.body.playlistId;
    console.log(req.body);
    res.send("success");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});
