const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/user');
require('dotenv').config();
const miniCrypt = require('../config/miniCrypt');
const mc = new miniCrypt();

module.exports = function(passport) {


	//set up the local passport for sign in 
    passport.use('local-login', new LocalStrategy({ 
    	usernameField: "username",
    	passwordField: "password"
    }, 
	    function (username, password, done) {
	    	console.log("got here local login");
	    	User.findOne({'local.username' : username}, function(err,user) {
	    		console.log(username + " : " + password);
	    		console.log(mc.hash(password));
				console.log(user);
	    		if (err) {
	    			console.log("error" + err);
	    		 	throw err;
	    			return done(err); 
	    		}
	    		if (!user) 
	    		{ 
	    			console.log("username not found");
	    			return done(null, false);
	    		}
	    		if(!(mc.check(password, user.local.salt, user.local.hash)))
	    		{
	    			console.log("pwd not verified");
	    			return done(null, false);
	    		}
	    		return done(null,user);
	    	});
	    }));

    //set up local 
    passport.use('local-register', new LocalStrategy({
    	usernameField: "username",
    	passwordField: "password",
    }, 
    	function (username, password, done) {
    		console.log("got here register");
    		User.findOne({'local.username' : username}, function(err,user) {
    			if(err) {
    				throw err;
    				return done(err);
    			}
    			if (user) {
    				console.log("username already exists");
    				//check password here
    				return done(null, false);
    			} else {
    				const newLocalUser = new User();
        			newLocalUser.local.username = username;
        			const toRet = mc.hash(password);
        			if(mc.check(password,toRet[0],toRet[1]))
        				console.log("checked successfully");
        			// console.log(toRet);
        			// console.log(mc.hash(password));
        			newLocalUser.local.hash = toRet[1];
        			newLocalUser.local.salt = toRet[0];
        			newLocalUser.save(function(err) {
        				if(err) {
        					throw err;
        				} else {
        				console.log("saved");
        				return done(null,newLocalUser);
        				}
        			});
    			}
     		})
    	}
    ));


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
        		const newGoogleUser = new User();
        		newGoogleUser.google.id = profile.id;
        		newGoogleUser.google.token = accessToken;
        		newGoogleUser.save(function(err) {
        			if(err) {
        				throw err;
        			} else {
        				console.log("saved");
        				return done(null,newGoogleUser);
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
		done(null, user);
		// User.findById(id, function(err, user)  {
	 //    	done(err, user);
	 //  	});
	});
}
