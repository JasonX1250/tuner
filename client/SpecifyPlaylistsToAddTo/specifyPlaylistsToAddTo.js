window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    addEndPlatformLogo();

    // add event listener to 'Continue' button
    document.getElementById("continue-btn").addEventListener("click", specifyPlaylists);
}

function addEndPlatformLogo() {
    const endPlatformLogo = document.getElementById("end-platform-logo");
    const logo = document.createElement("img");
    logo.id="end-platform-icon";
    logo.src = `../Logos/${endPlatforms[0]}.jpg`;
    endPlatformLogo.appendChild(logo);
    const text = document.createElement("div");
    text.id = "end-platform-name";
    text.appendChild(document.createTextNode(`${startPlatform}`));
    endPlatformLogo.appendChild(text);
}

function specifyPlaylists() {
    let specification = "find";
    let query = { "specification": specification};
    if (document.getElementById("link-existing-playlists").checked) {
        specification = "link";
        query["link"] = document.getElementById("existing-playlist-link").value;
    } else if (document.getElementById("add-new-playlist").checked) {
        specification = "new";
        query["title"] = document.getElementById("new-playlist-title").value;
        if (document.getElementById("privacy-public").checked) {
            query["privacy"] = "public";
        } else {
            query["privacy"] = "private";
        }
    }
}
