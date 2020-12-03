# Milestone 2

## Deployment

The tuner app can be found at <https://tuner-app.herokuapp.com/>

## API Overview

### GET Requests

### GET Methods

***queryMedia***  
Returns a list of media from the specified platform matching the given query parameters

| Parameter   | Description                                                            |
|-------------|------------------------------------------------------------------------|
| platform    | Target platform to query media from                                    |
| type        | Type of media to query for                                             |
| queryMethod | Method used to query media [ *link*, *query* ]                         |
| q           | Title of the media to query for (used only when queryMethod = *query*) |
| link        | Link to the media to query for (used only when queryMethod = *link*)   |

> Example: /queryMedia?platform=YouTube&type=Video&queryMethod=query&title=Silence  
  Returns: `[{ title: "Marshmello ft. Khalid - Silence (Official Lyric Video)", author: "Marshmello", link: "https://www.youtube.com/watch?v=tk36ovCMsU8", img: "https://i.ytimg.com/vi/tk36ovCMsU8/default.jpg" }, ... ]`

***getSavedPlaylists***  
Returns a list of saved collections of media under the user's account

| Parameter | Description                 |
|-----------|-----------------------------|
| userId    | Id used to specify the user |

> Example: /getSavedPlaylists?userID=exampleUserId  
  Returns: `[{ id: "5fb9b325c9300125243fab0f", title: "Playlist 1", list: [{title: "Candy Paint", author: "Post Malone", link: "https://open.spotify.com/track/32lItqlMi4LBhb4k0BaSaC", img: "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268"}, { title: "Candy Paint (feat. Bun B)", author: "Kodak Black", link: "https://open.spotify.com/track/5Su82DCebDzhL88yWyUasx", img: "https://i.scdn.co/image/ab67616d0000b2731541a676423805fc68ff3e66"}], length: 2, img: "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268", added: "11-21-2020" }, ... ]`

### POST Methods

***convertMedia***  
Returns a list of media found on the target platform matching the given input media

| Parameter     | Type          | Description                                        |
|---------------|---------------|----------------------------------------------------|
| startPlatform | String        | Platform to convert media from                     |
| endPlatform   | String        | Platform to convert media to                       |
| type          | String        | Type of the media to convert                       |
| media         | Array[Object] | List of media to convert to the specified platform |

- **media** object fields
  - *title* - String specifying the title of the media
  - *author* - String specifying the author of the media
  - *link* - String specifying the link to the media on the starting platform
  - *img* - String specifiying the link to the img/thumbnail of the media

> Example: /convertMedia with body: `{ startPlatform: "Spotify", endPlatform: "YouTube", type: "Track", media: {"title":"Silence","author":"Marshmello","link":"https://open.spotify.com/track/7vGuf3Y35N4wmASOKLUVVU","img":"https://i.scdn.co/image/ab67616d0000b273f33ba583059dc2f7d08bf2b8"}`  
  Returns: `[ {"title":"Marshmello ft. Khalid - Silence (Official Lyric Video)","author":"Marshmello","link":"https://youtube.com/watch?v=tk36ovCMsU8","img":"https://i.ytimg.com/vi/tk36ovCMsU8/default.jpg"},{"title":"Marshmello - Silence (Lyrics) ft. Khalid","author":"7clouds","link":"https://youtube.com/watch?v=4oXgCJf4hf8","img":"https://i.ytimg.com/vi/4oXgCJf4hf8/default.jpg"},{"title":"Marshmello - Silence Ft. Khalid (Official Music Video)","author":"Marshmello","link":"https://youtube.com/watch?v=Tx1sqYc3qas","img":"https://i.ytimg.com/vi/Tx1sqYc3qas/default.jpg"}, ... ]`

***newPlaylist***  
Creates a new playlist saved under the user's account on the application and returns the status of whether the media was successfully added to each playlist

| Parameter | Type          | Description                                     |
|-----------|---------------|-------------------------------------------------|
| userId    | String        | Id of the user to save the playlist for         |
| title     | String        | Name of the new playlist to be saved as         |
| playlist  | Array[Object] | Collection of media to save in the new playlist |

- **playlist** object fields
  - *title* - String specifying the title of the media
  - *author* - String specifying the author of the media
  - *link* - String specifying the link to the media on the starting platform
  - *img* - String specifiying the link to the img/thumbnail of the media

> Example: /newPlaylist with body: `{ userId: "5fba22f39d1f5851a05db70c", title: "New Playlist", playlist: [ {"title":"Marshmello ft. Khalid - Silence (Official Lyric Video)","author":"Marshmello","link":"https://youtube.com/watch?v=tk36ovCMsU8","img":"https://i.ytimg.com/vi/tk36ovCMsU8/default.jpg"} ]}`  
  Retuns: `{ success: true }`

***addToPlaylists***  
Adds the chosen pieces of media to specified playlists and returns the status of whether the media was successfully added to each playlist

| Parameter | Type          | Description                                               |
|-----------|---------------|-----------------------------------------------------------|
| userId    | String        | Id of the user who wants to save media to their playlists |
| media     | Array[Object] | Collection of media to add to their existing playlists    |
| playlists | Array[Object] | Collection of user's playlists to add the media to        |

> Example: /addToPlaylists with body: `{ userId: "5fba22f39d1f5851a05db70c", media: [{"title":"Marshmello ft. Khalid - Silence (Official Lyric Video)","author":"Marshmello","link":"https://youtube.com/watch?v=tk36ovCMsU8","img":"https://i.ytimg.com/vi/tk36ovCMsU8/default.jpg"}], playlists: [{"id":"5fc867d5f6a955000483c14c","title":"Playlist 1","list":[{"title":"Marshmello ft. Khalid - Silence (Official Lyric Video)","author":"Marshmello","link":"https://youtube.com/watch?v=tk36ovCMsU8","img":"https://i.ytimg.com/vi/tk36ovCMsU8/default.jpg"}],"length":1,"img":"https://i.ytimg.com/vi/tk36ovCMsU8/default.jpg","added":"12-3-2020"}] }`  
  Returns: `{ success: true }`

***login***  
Returns the status of login given user's credential and a valid userId upon successful authentication

| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| username  | String | username for login credentials |
| password  | String | password for login credentials |

> Example: /login with body: `{ username: user, password: pass}`  
  Returns: `{ success: true, userId: "5fba1bc35bc1152820059b19" }`

***register***  
Returns the status of registering an account for the user with their credentials

| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| username  | String | username for login credentials |
| password  | String | password for login credentials |

> Example: /login with body: `{ username: newUser, password: examplePassword }`  
  Returns: `{ success: true }`

### DELETE Methods

***deleteSavedPlaylist***  
Deletes the specified playlist from the user's collection of saved playlists and returns the status of whether the playlist was succesfully deleted

| Parameter  | Type   | Description                                                              |
|------------|--------|--------------------------------------------------------------------------|
| userId     | String | Id of the user that wants to delete a playlist saved under their account |
| playlistId | String | Id of the playlist to be deleted                                         |

## Examples of CRUD Operations

In this image, a POST request will be made to create a new playlist to add media to. The user will specify the title and privacy of the new playlist and a request will be sent to the `/newPlaylist` endpoint upon clicking *Continue*.
![Creating a new playlist](CrudScreenshots/NewPlaylist.png)

In this image, a GET request was made to retrieve the user's playlists saved under their account. They have access to the info of each playlist and the options to (1) convert the media in the selected playlist to another platform, (2) add the media in the selected playlist to another playlist on the same platform, or (3) delete the saved playlist from their account. The deletion will require making a DELETE request to the server, while the other two options will redirect the user to the proper page.
![Saved playlists](CrudScreenshots/SavedPlaylists.png)

In this image, a POST request was made to the `/convertMedia` endpoint. The response is then displayed onto the webpage, allowing users to choose which media pieces they would like to add to playlist(s). Here, we can also see that the user can also save it to their account with a specified title; this can be done with a POST request from the client to the `/savePlaylist` endpoint.
![Converted media](CrudScreenshots/ConvertedMedia.png)

This image shows the result of POST request to the `/addToPlaylists` endpoint. It displays the status of adding the selected media to the specified playlists and reports back which playlists the media have been successfully added to.
![Successfully added to playlists](CrudScreenshots/Success.png)

## Division of Labor

### Jason

- API Overview
- Backend Skeleton Code
  - server/index.js
- Configured Routing and added API calls to server from client
  - StartPlatformQuery  &#8594;  /startQuery
  - StartPlatformQueryResults  &#8594;  /startQueryResults
  - SelectEndPlatform  &#8594;  /selectEndPlatform
  - EndPlatformConvertedResults  &#8594;  /convertedMedia
  - SpecifyPlaylistsToAddTo  &#8594;  /playlistQuery
  - SelectPlaylistToAddTo  &#8594;  /addToPlaylists
  - AddToPlaylistResult  &#8594;  /addToPlaylistsResults
  - Login  &#8594;  /login
  - SavedPlaylists  &#8594;  /savedPlaylists
- Heroku Deployment
- Setup (on local machine) Doc
- CRUD Screenshots and Descriptions

### Yaocao

- Get the authorization from Spotify web api

### Alex

- implemented some basic scripts
- login page
- implemented google authentication
- added google oAuth client + authorized
