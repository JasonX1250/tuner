window.onload = async () => {
    await loadPlatforms();
    await loadMenu();
    addStartPlatformLogo();
    applyPlatformSpecifics();

    // add event listener to 'Search' button
    document.getElementById("search-btn").addEventListener("click", query);
}

const startPlatformLogo = document.getElementById("start-platform-logo");

function addStartPlatformLogo() {
    const logo = document.createElement("img");
    logo.id="start-platform-icon";
    logo.src = `../Logos/${startPlatform}.jpg`;
    startPlatformLogo.appendChild(logo);
    const text = document.createElement("div");
    text.id = "start-platform-name";
    text.appendChild(document.createTextNode(`${startPlatform}`));
    startPlatformLogo.appendChild(text);
}

function applyPlatformSpecifics() {
    const mediaType = document.getElementById("media-type");
    const authorLabel = document.getElementById("author-input-label");
    let mediaTypeOptions = [];
    let authorSynonym = "";
    switch(startPlatform) {
        case "YouTube": {
            mediaTypeOptions = ["video", "playlist"];
            authorSynonym = "Channel";
            break;
        }

        case "Spotify": {
            mediaTypeOptions = ["track", "album", "playlist"];
            authorSynonym = "Artist";
            break;
        }
    }
    for (const option of mediaTypeOptions) {
        const opt = document.createElement("option");
        opt.value = option;
        opt.appendChild(document.createTextNode(`${option}`));
        mediaType.appendChild(opt);
    }
    authorLabel.removeChild(authorLabel.firstChild);
    authorLabel.appendChild(document.createTextNode(authorSynonym));
}

function query() {
    const query = {};
    if (document.getElementById("link").checked) {
        query["link"] = document.getElementById("media-link").value;
    } else {
        query["mediaType"] = document.getElementById("media-type").value;
        query["title"] = document.getElementById("media-title").value;
        if (document.getElementById("author").value !== null || document.getElementById("author").value !== "") {
            query["author"] = document.getElementById("author").value;
        }
    }
}