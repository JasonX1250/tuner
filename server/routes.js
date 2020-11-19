const express = require('express');
var router = express.Router();
const passport = require('passport');

router.get("/queryMedia", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(ex1);
});

router.get("/queryPlaylists", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(ex1);
});

router.get("/getSavedPlaylists", (req, res) => {
    const userId = req.query.userId;
    console.log(req.query);
    res.send(ex2);
});

router.post("/convertMedia", (req, res) => {
    const platform = req.body.platform;
    const mediaToConvert = req.body.media;
    console.log(req.body);
    res.send(ex1);
});

router.post("/newPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const platform = req.body.platform;
    const playlistDetails = req.body.details;
    console.log(req.body);
    res.send([{ title: "Title YZ0", author: "Author YZ0", duration: "85:00", link: "link.com/yz0" }]);
});

router.post("/addToPlaylists", (req, res) => {
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

router.post("/savePlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const title = req.body.title;
    const media = req.body.media;
    console.log(req.body);
    res.send( {playlistId: "examplePlaylistId"} );
});

router.post("/getAuth", (req, res) => {
    const accessToken = req.body.accessToken;
    console.log(req.body);
    res.send({
        userId: "exampleUserId",
        authToken: "exampleAccessToken"
    });
});

router.post("/login", passport.authenticate('local',{
    sucessRedirect : '/SavedPlaylists',
    failureRedirect : '/'
}));

router.delete("/deleteSavedPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const playlistId = req.body.playlistId;
    console.log(req.body);
    res.send("success");
});

module.exports = router;
