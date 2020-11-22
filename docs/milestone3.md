# Milestone 3

## Deployment

### Hosted on Heroku

<https://tuner-app.herokuapp.com/>

## Database Implementation

### *UserDB.users*

- **_id : ObjectId** - distinct ID user recieves when registering for an account and added to the database
- **username : String** - username used for login
- **salt : String** - salt hash used for authenticating login
- **password : String** - password hash used for authenticating login
- *Example*: {  
  ***_id***: ObjectId("5fba22f39d1f5851a05db70c"),  
  ***username***: "user",  
  ***salt***: "61f176b0b0ea106b99388a49638e97ac",  
  ***password***: "4103d794b31b7b8ed46f8efed20a871600d8488bd7cc8f384a2 . . ." }

### *UserDB.playlists*

- **_id : String** - distinct ID of the playlist
- **title : String** - title of the playlist
- **list : Media[]** - array of media within the playlist
  - **title : String** - title of the media
  - **author : String** - author of the media
  - **link : String** - url link to the media
  - **img : String** - url for the thumnail of the media
- **img : String** - url for the thumbnail of the playlist
- **owner : String** - Id pertaining to the user that created the playlist
- **added : String** - string representing the date that the playlist was created on
- *Example*: {  
  ***_id***: ObjectId("5fba232e9d1f5851a05db70d"),  
  ***title***: "Playlist 1",  
  ***list***: *Array*,  
    &nbsp;&nbsp;&nbsp;&nbsp;0: *Object*  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***title***: "Candy Paint",  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***author***: "Post Malone",  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***link***: "https://open.spotify.com/track/32lItqlMi4LBhb4k0BaSaC",  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***img***: "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268"  
  ***img***: "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268",  
  ***owner***: "5fba22f39d1f5851a05db70c",  
  ***added***: "11-22-2020" }

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
- updated documentation of database implementation/schema

### Yaocao Chen

- help get the authrization from spotify
