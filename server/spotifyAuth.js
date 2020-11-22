var client_id = 'e92662cc9b004c118d3c21e33aef0f1d'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'https://tuner-app.herokuapp.com/login/'; // Your redirect uri

const express = require("express");
const app = express();

app.get('/login', function(req, res) {
    var scopes = 'user-read-private playlist-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });
