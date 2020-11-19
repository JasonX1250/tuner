# Milestone 3

## Back-end(MongoDB/mongoose)

#### MongoDB Collections for Tuner:

*UserDB.**users**(collection)* : 
- ***local : {***
  - ***_id : ObjectId*** *(Distinct id user recieves when authed into the db used to identify the user during passport.deserializeUser)*

  - ***username : String(unique)*** *(Username for local authorization)*

  - ***hash : String*** *(local pw hash)*

  - ***salt : String*** *(local pw salt)*

- ***google :*** 
  - ***id: String*** *(googleId from GoogleStrat of the user used to fetch YouTube playlists -- need the correct scope)*
  
  - ***channel: String(link)*** *(Will be used to store the channel of the user for easy access* **CURRENTLY UNACCESSABLE due to verification issues**
  
  - ***token: String*** *(authorization token for google)*
  
  - ***refreshToken: String***} *(used to get new auth token when regular one expires)*
  
- ***spotify :*** 
  - ***id: String(unique)*** *(spotifyId)*
  
  - ***token: String*** *(authorization token for spotify)*
  
  - ***refreshToken: String***} *(used to get new auth token when regular one expires)*
  
*UserDB.**playlists**(collection)* : 
- ***title: String*** *(title of the playlist)*

- ***user: Ref to UserSchema*** *(every playlist belongs to a user, reference user by id)*

- ***author: String*** *(channel/creator/artist)*

- ***link: String(unique)*** *(link to playlist)*

- ***platform: String*** *(which platform playlist is on)*

- ***media :*** *(list of media)*
  - ***title: String*** *(title of the media)*
  
  - ***author: String*** *(artist of the media)*
  
  - ***link: String(unique)*** *(link to playlist)* 


 

