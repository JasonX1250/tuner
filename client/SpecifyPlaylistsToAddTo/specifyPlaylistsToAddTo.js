window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    addEndPlatformLogo();

    // add event listener to 'Continue' button
    document.getElementById("continue-btn").addEventListener("click", specifyPlaylists);
    document.getElementById("go-back-btn").addEventListener("click", () => {
        window.location.href = `${url}/convertedMedia`;
    });
}

function addEndPlatformLogo() {
    const endPlatformLogo = document.getElementById("end-platform-logo");
    const logo = document.createElement("img");
    logo.id = "end-platform-icon";
    logo.src = `../Logos/${endPlatforms[0]}.jpg`;
    endPlatformLogo.appendChild(logo);
    const text = document.createElement("div");
    text.id = "end-platform-name";
    text.appendChild(document.createTextNode(`${endPlatforms[0]}`));
    endPlatformLogo.appendChild(text);
}

async function specifyPlaylists() {
    if (document.getElementById("add-new-playlist").checked) {
        const response = await fetch(`${url}/newPlaylist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                userId: "exampleUserId",
                auth: "exampleAuth",
                platform: endPlatforms[0],
                details: {
                    title: document.getElementById("new-playlist-title").value,
                    private: document.getElementById("privacy-private").checked
                }
            })
        });
        if (response.ok) {
            const data = await response.json();
            playlistsFound = data;
            window.localStorage.setItem("playlistsFound", JSON.stringify(playlistsFound));
            window.location.href = `${url}/addToPlaylists`;
        }
    } else {
        let query = `platform=${endPlatforms[0]}`;
        if (document.getElementById("find-existing-playlists").checked) {
            query += "&queryMethod=find";
        } else if (document.getElementById("link-existing-playlists").checked) {
            query += "&queryMethod=link";
            query += `&link=${document.getElementById("existing-playlist-link").value}`;
        }
        const response = await fetch(`${url}/queryPlaylists?${query}`);
        if (response.ok) {
            const data = await response.json();
            playlistsFound = data;
            window.localStorage.setItem("playlistsFound", JSON.stringify(playlistsFound));
            window.location.href = `${url}/addToPlaylists`;
        }
    }
}