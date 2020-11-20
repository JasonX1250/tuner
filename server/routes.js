const express = require('express');
var router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SPOTIFY_API_KEY = process.env.SPOTIFY_API_KEY;
const YOUTUBE = "YouTube";
const SPOTIFY = "Spotify";

const queryYoutubeQuery = async (q, type) => {
    const results = [];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=${type}` + `&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        for (media of data.items) {
            results.push({
                title: media.snippet.title,
                author: media.snippet.channelTitle,
                link: `https://youtube.com/watch?v=${media.id.videoId}`,
                img: media.snippet.thumbnails.default.url
            });
        }
    }
    return results;
};

const queryYoutubeLink = async (link, type) => {
    const results = [];
    let url = "";
    if (mediaType === "Video") {
        const results = [];
        let query = "?part=snippet";
        if (link.includes("v=")) {
            query += `&id=${link.substring(link.indexOf("v=") + 2)}`;
        } else {
            query += `&id=${link.substring(link.indexOf(".be/") + 4)}`;
        }
        url = "https://youtube.googleapis.com/youtube/v3/videos" + query + `&key=${GOOGLE_API_KEY}`;
    } else if (mediaType === "Playlist") {
        url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${link.substring(link.indexOf("list=") + 5)}` + `&key=${GOOGLE_API_KEY}`;
    }
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        for (media of data.items) {
            results.push({
                title: media.snippet.title,
                author: media.snippet.channelTitle,
                link: `https://youtube.com/watch?v=${media.id}`,
                img: media.snippet.thumbnails.default.url
            });
        }
    }
    return results;
};

const querySpotifyQuery = async (q, type) => {
    const results = [];
    const url = `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=10`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SPOTIFY_API_KEY}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        for (media of data[`${type}s`].items) {
            results.push({
                title: media.name,
                author: media.artists[0].name,
                link: media.external_urls.spotify,
                img: media.album.images[0].url
            });
        }
    }
    return results;
}

const querySpotifyLink = async (link, type) => {
    const results = [];
    let mediaId = "";
    switch (type) {
        case "album":
            mediaId = link.substring(link.indexOf("album/") + 6);
            break;
        case "playlist":
            mediaId = link.substring(link.indexOf("playlist/") + 9);
            break;
        case "track":
            mediaId = link.substring(link.indexOf("track") + 6);
            break;
    }
    const url = `https://api.spotify.com/v1/${type}s/${mediaId}`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SPOTIFY_API_KEY}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        results.push({
            title: data.name,
            author: data.artists[0].name,
            link: data.external_urls.spotify,
            img: data.album.images[0].url
        });
    }
    return results;
};

router.get("/queryMedia", async (req, res) => {
    let results = [];
    if (req.query.platform === YOUTUBE) {
        if (req.query.queryMethod === "query") {
            results = await queryYoutubeQuery(req.query.q, req.query.type.toLowerCase());
        } else if (req.query.queryMethod === "link") {
            results = await queryYoutubeLink(req.query.link, req.query.type);
        }
    } else if (req.query.platform === SPOTIFY) {
        if (req.query.queryMethod === "query") {
            results = await querySpotifyQuery(req.query.q, req.query.type.toLowerCase());
        } else if (req.query.queryMethod === "link") {
            results = await querySpotifyLink(req.query.link, req.query.type.toLowerCase());
        }
    }
    res.send(results);
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
    res.send([{
        title: "Title YZ0",
        author: "Author YZ0",
        duration: "85:00",
        link: "link.com/yz0"
    }]);
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
    res.send({
        playlistId: "examplePlaylistId"
    });
});

router.post("/getAuth", (req, res) => {
    const accessToken = req.body.accessToken;
    console.log(req.body);
    res.send({
        userId: "exampleUserId",
        authToken: "exampleAccessToken"
    });
});

router.post("/login", passport.authenticate('local', {
    sucessRedirect: '/SavedPlaylists',
    failureRedirect: '/'
}));

router.delete("/deleteSavedPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const playlistId = req.body.playlistId;
    console.log(req.body);
    res.send("success");
});

module.exports = router;