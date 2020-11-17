# Milestone 3

## Back-end(MongoDB/mongoose)

#### MongoDB Collections:

*UserDB.users(collection)* : 
- ***_id : ObjectId*** *(Distinct id user recieves when authed into the db used to identify the user during passport.deserializeUser)*
- ***username : String(unique)*** *(Username for local authorization)*
- ***password : String*** *(Password for local authorization, may be empty when user logs in with google/spotify)*
- ***google :*** 
  - ***id: String(unique)*** *(googleId from GoogleStrat of the user used to fetch YouTube playlists)*
  - ***token: String*** *(authorization token for google)*
  - ***refreshToken: String***} *(used to get new auth token)*
- ***spotify :*** 
  - ***id: String(unique)*** *(spotifyId)*
  - ***token: String*** *(authorization token for spotify)*
  - ***refreshToken: String***} *(used to get new auth token)*
- ***playlists :*** *(list of playlists)*
  - ***title: String*** *(title of the playlist)*
  - ***author: String*** *(channel/creator/artist)*
  - ***link: String(unique)*** *(link to playlist)*
  - ***platform: String*** *(which platform playlist is on)*
  - ***media :*** *(list of media)*
    - ***title: String*** *(title of the media)*
    - ***author: String*** *(artist of the media)*
    - ***link: String(unique)*** *(link to playlist)* 


 

