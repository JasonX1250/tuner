const express = require('express');
const router = express.Router();
const passport = require('passport');
require("../config/passport.js")(passport);
const fetch = require('node-fetch');


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

router.get("/queryMedia", (req, res) => {
    const platform = req.query.platform;
    const queryMethod = req.query.queryMethod;
    console.log(req.query);
    res.send(ex1);
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
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
        for (media of data[`${type}s`].items) {
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
}

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
}

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
            for (item of data.items) {
                media.push({
                    title: item.track.name,
                    author: item.track.artists[0].name,
                    id: item.track.id,
                });
            }
        } else if (response.ok && type === "Album") {
            const data = await response.json();
            for (item of data.items) {
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

// router.get("/queryPlaylists", (req, res) => {
//     const platform = req.query.platform;
//     const queryMethod = req.query.queryMethod;
//     console.log(req.query);
//     res.send(ex1);
// });

router.get("/getSavedPlaylists", (req, res) => {
    const userId = req.query.userId;
    console.log(req.query);
    res.send(ex2);
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
        for (media of mediaToConvert) {
            const converted = await queryYoutubeQuery(media.title.replace(/[^\w\s]/gi, ""), "video");
            console.log(JSON.stringify(media));
            console.log(JSON.stringify(converted));
            if (mediaToConvert.length === 1) {
                results = converted;
            } else {
                results.push(converted[0]);
            }
        }
    } else if (req.body.endPlatform === SPOTIFY) {
        for (media of mediaToConvert) {
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

// router.post("/savePlaylist", (req, res) => {
//     const userId = req.body.userId;
//     const auth = req.body.auth;
//     const title = req.body.title;
//     const media = req.body.media;
//     console.log(req.body);
//     res.send({
//         playlistId: "examplePlaylistId"
//     });
// });

// router.post("/getAuth", (req, res) => {
//     const accessToken = req.body.accessToken;
//     console.log(req.body);
//     res.send({
//         userId: "exampleUserId",
//         authToken: "exampleAccessToken"
//     });
// });


router.post("/login", passport.authenticate('local-login', {
    failureRedirect : '/login'
	}), (req,res) => {
        const userId = req.user._id;
        console.log(req.user._id + " userId");
        res.redirect('/');
    }
);

router.post("/register", passport.authenticate('local-register',{
    failureRedirect : '/register',
    sucessRedirect : '/'
    }), (req,res) => {
        const userId = req.user._id;
        console.log(req.user._id + " userId");
    }
);

// router.post('/register',
//      (req, res) => {
//          const username = req.body['username'];
//          const password = req.body['password'];
//          console.log(username);
//          // if (addUser(username, password)) {
//          // res.redirect('/login');
//          // } else {
//          // res.redirect('/register');
//          // }
//          res.end();
//      });

router.get('/login/google', passport.authenticate('google', { scope: ["profile","email"] }));

router.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/login' }),
	//otherwise redirects back home since found the right user
	(req,res)=>{
		console.log(req.user + "user");
		const accessToken = req.user.google.token;
		console.log(accessToken + "accessToken");
    	res.redirect("/getSavedPlaylists");
});

router.delete("/deleteSavedPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const playlistId = req.body.playlistId;
    console.log(req.body);
    res.send("success");
});


function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;