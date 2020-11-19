const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const express = require("express");
const app = express();
const {google} = require('googleapis');
require('dotenv').config();

const User = require('../models/user');

// set up new strategy for google
passport.use(new GoogleStrategy(
    {
    	//
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/login/google/return',
        passReqToCallback   : true
    },
   function (request, accessToken, refreshToken, profile, done) 
    { 
    	console.log(profile.id);
        User.findOne({'google.id' : profile.id}, function(err,user) {
        	if(err) {
        		console.log(err);
        	}
        	if(user) {
        		return done(null,user);
        	} else {
        		const newUser = new User();
        		newUser.google.id = profile.id;
        		newUser.google.token = token;
        			//'google' : { 'id' : profile.id,'token' : accessToken,'rfreshToken' : refreshToken }
        		user.save(function(err) {
        			if(err) {
        				throw err;
        			} else {
        				console.log("saved");
        				return done(null,user);
        			}
        		});
        		}
        });
    }
    ));



    //     	.then((currentUser) => {
    //     	if(currentUser)
    //     	{
    //     		done(null,currentUser);
    //     	}
    //     	else
    //     	{
    //     		const new_user = new User(
    //     		{
    //     			'username' : profile.emails[0].value,
    //     			'google' : {
    //     				'id' : profile.id,
				// 		'token' : accessToken,
    //     				'rfreshToken' : refreshToken
    //     			}
    //     		}).save().then((newUser) =>{
    //     			done(null,newUser);
    //     		});
    //     	}
    //     }).catch(function(err) {
    //     	console.log(err);
    //     })

    // }));




passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user)  {
    done(err, user);
  });
});

passport.serializeUser((user, done) => {
  		done(null, user.id); //stores user id in session
	});

module.exports = function (app) {
//redi
app.get('/login/google', passport.authenticate('google', { scope: ["profile","email"] }));
app.use(passport.initialize());
//goes back to login on failure
app.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/login' }),
	//otherwise redirects back home since found the right user
	(req,res)=>{
		console.log(req.user + "user");
		const accessToken = req.user.google.token;
		console.log(accessToken + "accessToken");
    	res.redirect("/");
});
}