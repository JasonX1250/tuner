const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require("../config/UserModel");
const express = require("express");
const app = express();

//set up new strategy for google
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/login/google/return'
    },
    (accessToken, refreshToken, profile, done) => {
        done(null,profile);
        //do stuff here to find in database 
    }
    )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

module.exports = function (app) {
app.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.use(passport.initialize());
app.get('/login/google/return', passport.authenticate('google'),(req,res)=>{
    res.redirect("/");
  // res.send(req.user);
  // res.send("you reached the redirect URI")
});
}