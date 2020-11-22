# Milestone 3

## Back-end(MongoDB/mongoose)

### MongoDB Collections for Tuner

_UserDB.**users**(collection)_ :

- **_local : {_**

  - **_\_id : ObjectId_** _(Distinct id user recieves when authed into the db used to identify the user during passport.deserializeUser)_

  - **_username : String(unique)_** _(Username for local authorization)_

  - **_hash : String_** _(local pw hash)_

  - **_salt : String_** _(local pw salt)_

- **_google : {_**

  - **_id: String_** _(googleId from GoogleStrat of the user used to fetch YouTube playlists -- need the correct scope)_

  - **_channel: String(link)_** _(Will be used to store the channel of the user for easy access_ **CURRENTLY UNACCESSABLE due to verification issues**

  - **_token: String_** _(authorization token for google)_

  - **_refreshToken: String_**} _(used to get new auth token when regular one expires)_

- **_spotify : {_**

  - **_id: String(unique)_** _(spotifyId)_

  - **_token: String_** _(authorization token for spotify)_

  - **_refreshToken: String_**} _(used to get new auth token when regular one expires)_

_UserDB.**playlists**(collection)_ :

- **_title: String_** _(title of the playlist)_

- **_user: Ref to UserSchema_** _(every playlist belongs to a user, reference user by id)_

- **_author: String_** _(channel/creator/artist)_

- **_link: String(unique)_** _(link to playlist)_

- **_platform: String_** _(which platform playlist is on)_

- **_media : {_** _(list of media)_

  - **_title: String_** _(title of the media)_

  - **_author: String_** _(artist of the media)_

  - **_link: String(unique)}_** _(link to playlist)_

## Division of Labor

### Alex

- Database schema overview
- submitted app for verification for external use
- implemented both local and google passports in pasport.js
- restructured authentication paths
- created user and playlist schemas
- created Mongodb database/ dev users
- established connection to db with mongoose from the server
- set up user verification with passport and mongoose
- restructured index.js into routes.js for easier maintanance

### Jason

- made some adjustments and fixed bugs in frontend for receiving data from the server
- implemented endpoints for querying media for both YouTube and Spotify
- implemented endpoints for converting media for both YouTube and Spotify
- implemented endpoint for saving new playlists to database
- implemented endpoint for updating playlists in database
- implemented endpoint for deleting saved playlists from database
- implemented endpoint for register and login

### Yaocao Chen

- help get the authrization from spotify
