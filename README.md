# tuner
> Web app for media conversion between different platforms.

### CS 326 Project
Team: Gimel
Application: Tuner

### Team Overview
Jason Xiao @JasonX1250
Alex Lapin
Yaocao Chen @Yaocao

### Innovative Idea
The idea of the Tuner application is to provide users with a convenient way to find relevant or related videos on Youtube given a Spotify song and vice versa. It will also allow users to configure playlists on either platform. The goal is to provide a seamless automated process for querying related content between the two platforms rather than the manual effort of searching and switching between Youtube and Spotify.

This application is similar to other existing applications, most notably Soundiiz (a playlist converter for different platforms). However, some of its features are blocked by a paywall, requiring premium membership. It also seems to primarily deal with playlists. Our application will focus more on giving users further control over the songs or videos that they choose to add or create playlists from. This will be done by giving users the option to remove a song/video on the generated playlist. They will also be able to replace it instead with other alternative songs/videos found relating to the original content.

### Important Components
The application will allow users to specify a specific Youtube video (via its title or link) and receive information and links to relevant Spotify songs related to the search query. Users will be able to do the reverse as well; they will be able to query a Spotify song (via its title, artist, or link) and receive information and links to relevant Youtube videos related to their search parameters. In addition to individual videos and songs, users will be able to configure playlists. Users can choose to add selected songs and videos to their existing playlists or generate new ones from them. The application will also allow users to specify a playlist on one of the two platforms and generate a new collection of either songs or videos (each with some relevance or relation to a song/video on the input playlist) on the other platform. Similar to the previous feature, they will then be able to create a new playlist from this generated collection or add them to an existing playlist.

This application will be storing information about the songs and videos obtained through Youtube’s Data API and Spotify’s Web API. It will also require user login for both Youtube and Spotify.
