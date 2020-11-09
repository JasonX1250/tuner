window.onload = async () => {
    loadMenu();
    addEndPlatformLogo();
    loadLogin();

    // add event listener to 'Continue' button
    document.getElementById("continue-btn").addEventListener("click", specifyPlaylists);
    document.getElementById("go-back-btn").addEventListener("click", () => {
        window.history.back();
    });
}

const endPlatform = window.localStorage.getItem("endPlatform");

function addEndPlatformLogo() {
    const endPlatformLogo = document.getElementById("end-platform-logo");
    const logo = document.createElement("img");
    logo.id = "end-platform-icon";
    logo.src = `../Logos/${endPlatform}.jpg`;
    endPlatformLogo.appendChild(logo);
    const text = document.createElement("div");
    text.id = "end-platform-name";
    text.appendChild(document.createTextNode(`${endPlatform}`));
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
                userId: window.localStorage.getItem("userId"),
                auth: window.localStorage.getItem("authToken"),
                platform: endPlatform,
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
        let query = `platform=${endPlatform}`;
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