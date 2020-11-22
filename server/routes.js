const express = require('express');
const router = express.Router();
const passport = require('passport');


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

router.post("/login", passport.authenticate('local-login', {
	sucessRedirect : '/SavedPlaylists',
    failureRedirect : '/login'
	}), (req,res) => {
        const userId = req.user.local.username;
        console.log(req.user.local.username + " user");
        res.redirect('/SavedPlaylists');
    }
);

router.post("/register", passport.authenticate('local-register',{
	sucessRedirect : '/SavedPlaylists',
    failureRedirect : '/register'
}));

router.get('/login/google', passport.authenticate('google', { scope: ["profile","email"] }));

router.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/login' }),
	//otherwise redirects back home since found the right user
	(req,res)=>{
		console.log(req.user + "user");
		const accessToken = req.user.google.token;
		console.log(accessToken + "accessToken");
    	res.redirect("/");
});

router.delete("/deleteSavedPlaylist", (req, res) => {
    const userId = req.body.userId;
    const auth = req.body.auth;
    const playlistId = req.body.playlistId;
    console.log(req.body);
    res.send("success");
});

module.exports = router;
