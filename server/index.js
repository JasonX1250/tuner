"use strict";

const path = require("path");
const express = require("express");
const app = express();

const ex1 = [
    { title: "Title ABC", author: "Author ABC", duration: "5:00", link: "link.com/abc", img: "thumbnail.com/abc" },
    { title: "Title DEF", author: "Author DEF", duration: "15:00", link: "link.com/def", img: "thumbnail.com/def" },
    { title: "Title GHI", author: "Author GHI", duration: "25:00", link: "link.com/ghi", img: "thumbnail.com/ghi" },
    { title: "Title JKL", author: "Author JKL", duration: "35:00", link: "link.com/jkl", img: "thumbnail.com/jkl" },
    { title: "Title MNO", author: "Author MNO", duration: "45:00", link: "link.com/mno", img: "thumbnail.com/mno" },
    { title: "Title PQR", author: "Author PQR", duration: "55:00", link: "link.com/pqr", img: "thumbnail.com/pqr" },
    { title: "Title STU", author: "Author STU", duration: "65:00", link: "link.com/stu", img: "thumbnail.com/stu" },
    { title: "Title VWX", author: "Author VWX", duration: "75:00", link: "link.com/vwx", img: "thumbnail.com/vwx" },
    { title: "Title YZ0", author: "Author YZ0", duration: "85:00", link: "link.com/yz0", img: "thumbnail.com/yz0" },
];
const ex2 = [
    { title: "Title ABC", author: "Author ABC", duration: "5:00", link: "link.com/abc", playlistId: 1, platform: "YouTube" },
    { title: "Title DEF", author: "Author DEF", duration: "15:00", link: "link.com/def", playlistId: 2, platform: "YouTube" },
    { title: "Title GHI", author: "Author GHI", duration: "25:00", link: "link.com/ghi", playlistId: 3, platform: "YouTube" },
    { title: "Title JKL", author: "Author JKL", duration: "35:00", link: "link.com/jkl", playlistId: 4, platform: "YouTube" },
    { title: "Title MNO", author: "Author MNO", duration: "45:00", link: "link.com/mno", playlistId: 5, platform: "YouTube" },
    { title: "Title PQR", author: "Author PQR", duration: "55:00", link: "link.com/pqr", playlistId: 6, platform: "YouTube" },
    { title: "Title STU", author: "Author STU", duration: "65:00", link: "link.com/stu", playlistId: 7, platform: "YouTube" },
    { title: "Title VWX", author: "Author VWX", duration: "75:00", link: "link.com/vwx", playlistId: 8, platform: "YouTube" },
    { title: "Title YZ0", author: "Author YZ0", duration: "85:00", link: "link.com/yz0", playlistId: 9, platform: "YouTube" },
];

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

app.get("/queryMedia", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(ex1);
});

app.get("/queryPlaylists", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(ex1);
});

app.get("/getSavedPlaylists", (req, res) => {
    const userId = req.query.userId;
    console.log(req.query);
    res.send(ex2);
});

app.post("/convertMedia", (req, res) => {
    const platform = req.body.platform;
    const mediaToConvert = req.body.media;
    console.log(req.body);
    res.send(ex1);
});

app.post("/newPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const platform = req.body.platform;
    const playlistDetails = req.body.details;
    console.log(req.body);
    res.send([{ title: "Title YZ0", author: "Author YZ0", duration: "85:00", link: "link.com/yz0" }]);
});

app.post("/addToPlaylists", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const media = req.body.media;
    const playlists = req.body.playlists;
    console.log(req.body);
    const ex = [];
    for (const p of playlists) {
        ex.push("success");
    }
    res.send(ex);
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
