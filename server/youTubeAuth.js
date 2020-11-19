var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

//only need to see playlists 
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
//creating token directory 
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
//path to actual token 
var TOKEN_PATH = TOKEN_DIR + 'youtube.json';

//check for secret file
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  authorize(JSON.parse(content), getChannel);
});
