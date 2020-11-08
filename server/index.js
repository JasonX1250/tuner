"use strict";

const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const exampleData = [
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" },
    { title: "Some Random Title", author: "Some Random Author", duration: "5:00", link: "Some Random Link" }
];

app.use(express.static(path.join(__dirname, '../client')));

app.get("/queryMedia", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(exampleData);
});

app.get("/queryPlaylists", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.queury.queryMethod;
    console.log(req.query);
    res.send(exampleData);
});

app.get("/getSavedPlaylists", (req, res) => {
    const userId = req.query.userId;
    console.log(req.query);
    res.send(exampleData);
});

app.post("/convertMedia", (req, res) => {
    const platform = req.query.platform;
    const mediaToConvert = req.query.media;
    console.log(req.query);
    res.send(exampleData);
});

app.post("/newPlaylist", (req, res) => {
    const userId = req.query.userId;
    const auth = req.query.auth;
    const platform = req.query.platform;
    const playlistDetails = req.query.details;
    console.log(req.query);
    res.send("SomeRandomLink.com/playlist/abc123");
});

app.post("/addToPlaylists", (req, res) => {
    const userId = req.query.userId;
    const auth = req.query.auth;
    const media = req.query.media;
    const playlists = req.query.playlists;
    console.log(req.query);
    res.send(["success", "success", "success", "success"]);
});

app.post("/savePlaylist", (req, res) => {
    const userId = req.query.userId;
    const auth = req.query.auth;
    const title = req.query.title;
    const media = req.query.media;
    console.log(req.query);
    res.send("examplePlaylistId");
});

app.delete("/deleteSavedPlaylist", (req, res) => {
    const userId = req.query.userId;
    const auth = req.query.auth;
    const playlistId = req.query.playlistId;
    console.log(req.query);
    res.send("success");
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
