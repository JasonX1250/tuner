const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/user');
require('dotenv').config();

module.exports = function(passport) {


	//set up the local passport
    passport.use('local', new LocalStrategy({ 
    	usernameField: "username",
    	passwordField: "password",
    	passReqToCallback : true
    }, 
	    function (req, username, password, done) {
	    	User.findOne({'local.username' : username}, function(err,user) {
	    		if (err) {
	    		 	throw err;
	    			return done(err); 
	    		}
	    		if (!user) { 
	    			console.log("username not found");
	    			return done(null, false); }
	    		//need to verify password here placeholder for now
	    		return done(null,user);
	    	})
	    }));
	//GOOGLE passport
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
    	//locate user with according google id
        User.findOne({'google.id' : profile.id}, function(err,user) {
        	if(err) {
        		console.log(err);
        	}
        	//if we found the user return that user 
        	if(user) {
        		return done(null,user);
        	} else { //else create new user
        		const newUser = new User();
        		newUser.google.id = profile.id;
        		newUser.google.token = token;
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

    //generating the user id that will be stored in session used to get the entire user with deserialize
	passport.serializeUser((user, done) => {
  		done(null, user.id); //should store user id in session automatically
	});

	passport.deserializeUser((user, done) => {
		User.findById(id, function(err, user)  {
	    	done(err, user);
	  	});
	});
}
