const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const minicrypt = require('./miniCrypt');

const mc = new minicrypt();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const YOUTUBE = "YouTube";
const SPOTIFY = "Spotify";


const queryYoutubeQuery = async (q, type) => {
    const results = [];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=${type}` + `&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        for (media of data.items) {
            let link = `https://youtube.com/watch?v=${media.id.videoId}`;
            if (type === "playlist") {
                link = `https://youtube.com/playlist?list=${media.id.playlistId}`;
            }
            results.push({
                title: media.snippet.title,
                author: media.snippet.channelTitle,
                link: link,
                img: media.snippet.thumbnails.default.url
            });
        }
    }
    return results;
};

const queryYoutubeLink = async (link, type) => {
    const results = [];
    let url = "";
    if (type === "Video") {
        let query = "?part=snippet";
        if (link.includes("v=")) {
            query += `&id=${link.substring(link.indexOf("v=") + 2)}`;
        } else {
            query += `&id=${link.substring(link.indexOf(".be/") + 4)}`;
        }
        url = "https://youtube.googleapis.com/youtube/v3/videos" + query + `&key=${GOOGLE_API_KEY}`;
    } else if (type === "Playlist") {
        url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${link.substring(link.indexOf("list=") + 5)}` + `&key=${GOOGLE_API_KEY}`;
    }
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        for (const media of data.items) {
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
    const access_token = await getSpotifyAccessToken();
    const results = [];
    const url = `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=10`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        for (const media of data[`${type}s`].items) {
            let image = "";
            let artist = "";
            if (type === "album") {
                image = media.images[0].url;
                artist = media.artists[0].name;
            } else if (type === "track") {
                image = media.album.images[0].url;
                artist = media.artists[0].name;
            } else if (type === "playlist") {
                image = media.images[0].url;
                artist = media.owner.display_name;
            }
            results.push({
                title: media.name,
                author: artist,
                link: media.external_urls.spotify,
                img: image
            });
        }
    }
    return results;
};

const querySpotifyLink = async (link, type) => {
    const access_token = await getSpotifyAccessToken();
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
            "Authorization": `Bearer ${access_token}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        let image = "";
        let artist = "";
        if (type === "album") {
            image = data.images[0].url;
            artist = data.artists[0].name;
        } else if (type === "track") {
            image = data.album.images[0].url;
            artist = data.artists[0].name;
        } else if (type === "playlist") {
            image = data.images[0].url;
            artist = data.owner.display_name;
        }
        results.push({
            title: data.name,
            author: artist,
            link: data.external_urls.spotify,
            img: image
        });
    }
    return results;
};

const getSpotifyAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
        },
        body: "grant_type=client_credentials"
    });
    if (response.ok) {
        const access_token = await response.json();
        return access_token["access_token"];
    }
};

const extractMediaFromCollection = async (platform, type, collection) => {
    const media = [];
    if (platform === YOUTUBE) {
        if (type === "Playlist") {
            let data = {};
            do {
                let query = `&playlistId=${collection.link.substring(collection.link.indexOf("list=") + 5)}`;
                if ("nextPageToken" in data) {
                    query += `&pageToken=${data.nextPageToken}`;
                }
                let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50" + query + `&key=${GOOGLE_API_KEY}`;
                let response = await fetch(url);
                if (response.ok) {
                    data = await response.json();
                    for (video of data.items) {
                        media.push({
                            title: video.snippet.title,
                            author: video.snippet.channelTitle,
                            id: video.snippet.resourceId.videoId,
                        });
                    }
                }
            } while ("nextPageToken" in data);
        }
    } else if (platform === SPOTIFY) {
        const access_token = await getSpotifyAccessToken();
        let url = "";
        if (type === "Playlist") {
            url = `https://api.spotify.com/v1/playlists/${collection.link.substring(collection.link.indexOf("playlist/") + 9)}/tracks`;
        } else if (type === "Album") {
            url = `https://api.spotify.com/v1/albums/${collection.link.substring(collection.link.indexOf("album/") + 6)}/tracks`;
        }
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        });
        if (response.ok && type === "Playlist") {
            const data = await response.json();
            for (const item of data.items) {
                media.push({
                    title: item.track.name,
                    author: item.track.artists[0].name,
                    id: item.track.id,
                });
            }
        } else if (response.ok && type === "Album") {
            const data = await response.json();
            for (const item of data.items) {
                media.push({
                    title: item.name,
                    author: item.artists[0].name,
                    id: item.id,
                });
            }
        }
    }
    return media;
};

const loadDatabase = async (database, collection, query) => {
    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {
        await client.connect();
        const db = client.db(database);
        let col = db.collection(collection);
        const response = await col.find(query).toArray();
        return response;
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
};

const insertDatabase = async (database, collection, data) => {
    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {
        await client.connect();
        const db = client.db(database);
        let col = db.collection(collection);
        const response = await col.insertOne(data);
        return response.insertedCount === 1;
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
};

const deleteDatabase = async (database, collection, userId, playlistId) => {
    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {
        await client.connect();
        const db = client.db(database);
        let col = db.collection(collection);
        const response = await col.deleteOne({
            owner: userId,
            _id: ObjectId(playlistId)
        });
        return response.deletedCount === 1;
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
};

const updateDatabase = async (database, collection, query, update) => {
    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {
        await client.connect();
        const db = client.db(database);
        let col = db.collection(collection);
        const response = await col.updateOne(query, update);
        return response.modifiedCount === 1;
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
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

router.get("/getSavedPlaylists", async (req, res) => {
    const playlists = await loadDatabase("UserDB", "playlists", {
        owner: req.query.userId
    });
    const results = [];
    for (const playlist of playlists) {
        results.push({
            id: playlist._id,
            title: playlist.title,
            list: playlist.list,
            length: playlist.list.length,
            img: playlist.img,
            added: playlist.added
        });
    }
    res.send(results);
});

router.post("/convertMedia", async (req, res) => {
    let mediaToConvert = [];
    let results = [];
    if (req.body.type === "Playlist" || req.body.type === "Album") {
        mediaToConvert = await extractMediaFromCollection(req.body.startPlatform, req.body.type, req.body.media);
    } else {
        mediaToConvert.push(req.body.media);
    }
    if (req.body.endPlatform === YOUTUBE) {
        for (const media of mediaToConvert) {
            const converted = await queryYoutubeQuery(media.title.replace(/[^\w\s]/gi, ""), "video");
            if (mediaToConvert.length === 1) {
                results = converted;
            } else {
                results.push(converted[0]);
            }
        }
    } else if (req.body.endPlatform === SPOTIFY) {
        for (const media of mediaToConvert) {
            const converted = await querySpotifyQuery(media.title.replace(/[^\w\s]/gi, ""), "track");
            if (mediaToConvert.length === 1) {
                results = converted;
            } else {
                results.push(converted[0]);
            }
        }
    }
    res.send(results);
});

router.post("/newPlaylist", async (req, res) => {
    const date = new Date();
    const result = await insertDatabase("UserDB", "playlists", {
        title: req.body.title,
        list: req.body.playlist,
        img: req.body.playlist[0].img,
        owner: req.body.userId,
        added: (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    });
    res.send({
        success: result
    });
});

router.post("/addToPlaylists", async (req, res) => {
    const results = [];
    for (const playlist of req.body.playlists) {
        const updatedPlaylist = playlist.list;
        for (const media of req.body.media) {
            updatedPlaylist.push(media);
        }
        const result = await updateDatabase("UserDB", "playlists", {
            owner: req.body.userId,
            _id: ObjectId(playlist.id)
        }, {
            $set: {
                list: updatedPlaylist
            }
        });
        results.push(result);
    }
    res.send(results);
});

router.delete("/deleteSavedPlaylist", async (req, res) => {
    res.send({
        success: await deleteDatabase("UserDB", "playlists", req.body.userId, req.body.playlistId)
    });
});

router.post("/loginUser", async (req, res) => {
    const users = await loadDatabase("UserDB", "users", {
        username: req.body.username
    });
    if (users.length === 1) {
        if (mc.check(req.body.password, users[0].salt, users[0].password)) {
            res.send({ success: true, userId: users[0]._id });
        } else {
            res.send({ success: false });
        }
    } else {
        res.send({success: false});
    }
});

router.post("/registerUser", async (req, res) => {
    const users = await loadDatabase("UserDB", "users", {
        username: req.body.username
    });
    if (users.length === 0) {
        const [salt, hash] = mc.hash(req.body.password);
        const result = await insertDatabase("UserDB", "users", {
            username: req.body.username,
            salt: salt,
            password: hash
        });
        res.send({
            success: result
        });
    } else {
        res.send({
            success: false
        });
    }
});

router.get('/login/google', passport.authenticate('google', {
    scope: ["profile", "email"]
}));

router.get('/login/google/return', passport.authenticate('google', {
        failureRedirect: '/login/'
    }),
    //otherwise redirects back home since found the right user
    (req, res) => {
        // window.localStorage.setItem("userId", req.user._id);
        // window.location.href = `${url}`;
        console.log(req.user._id + "user");
        res.redirect('/');
    });

module.exports = router;