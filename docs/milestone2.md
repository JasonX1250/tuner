# Milestone 2

## API Overview

### GET Requests

> ***queryMedia***  
Returns a list of media from the specified platform matching the given query parameters

| Parameter | Description |
|-----------|-------------|
| platform | Target platform to query media from |
| queryMethod | Method used to query media [ *link*, *query* ] |
| query | Parameters used to query media based on queryMethod |

- **query** fields when **queryMethod** = *link*

  - *link* - String specifying link to media on specified platform

- **query** fields when **queryMethod** = *query*

  - *title* - String specifying the title of media to query for
  - *type* - String specifying type of media to query for
  - *artist* (optional) - String specifying artist of media to query for

Example: /queryMedia?platform=YouTube&queryMethod=query&title=exampleTitle&type=video

> ***queryPlaylists***  
Returns a list of playlists from the specified platform matching the given query parameters

| Parameter | Description |
|-----------|-------------|
| platform | Target platform to query for playlists on |
| queryMethod | Method used to query for playlists [ *find*, *link* ] |
| query | Parameters used to query playlists based on queryMethod |

- **query** can be left empty when **queryMethod** = *find*
- **query** fields when **queryMethod** = *link*
  - *link* (String) - Link to playlist on specified platform

Example: /queryPlaylists?platform=Spotify&queryMethod=link&link=exampleLink

> ***getSavedPlaylists***  
Returns a list of saved collections of media under the user's account

| Parameter | Description |
|-----------|-------------|
| userId | Id used to specify the user |

Exampe: /getSavedPlaylists?userID=exampleID

### POST Requests

> ***convertMedia***  
Returns a list of media found on the target platform matching the given input media

| Parameter | Type | Description |
|-----------|------|-------------|
| platform | String | Target platform to convert media to |
| media | Array[Object] | List of media to convert to the specified platform |

- **media** object fields
  - *title* - String specifying the title of the media
  - *artist* - String specifying the artist of the media
  - *duration* - String specifying the duration of the media

> ***newPlaylist***  
Creates a new playlist on the specified platform

| Parameter | Type | Description |
|-----------|------|-------------|
| userId | String | Id used to specify the user |
| auth | String | Authetication for verifying the user |
| platform | String | Target platform to create the new playlist on |
| details | Object | Parameters used for creating the new playlist |

- **details** fields
  - *title* - String specifying the title of the playlist to query for
  - *private* - Boolean specifying whether the new playlist will be private ( *true* ) or public ( *false* )

> ***addToPlaylists***  
Adds the specified media to the target playlists

| Parameter | Type | Description |
|-----------|------|-------------|
| userId | String | Id used to specify the user |
| auth | String | Authetication for verifying the user |
| media | Array[String] | List of links to media to be added to playlists |
| playlists | Array[String] | List of links to playlists to add the media to |

> ***savePlaylist***  
Saves the collection of converted media to user's account

| Parameter | Type | Description |
|-----------|------|-------------|
| userId | String | Id used to specify the user |
| auth | String | Authetication for verifying the user |
| title | String | Name for the collection of media to save |
| media | Array[String] | List of links to media to be added to playlists |

- **media** object fields
  - *title* - String specifying the title of the media
  - *artist* - String specifying the artist of the media
  - *duration* - String specifying the duration of the media
  - *link* - String specifying the link for the media

### DELETE Requests

> ***deleteSavedPlaylist***  
Deletes the specified playlist from the user's collection of saved playlists

| Parameter | Type | Description |
|-----------|------|-------------|
| userId | String | Id used to specify the user |
| auth | String | Authetication for verifying the user |
| playlistID | String | ID of the playlist to delete |

## Division of Labor

### Jason

- API Overview

### Yaocao

### Alex