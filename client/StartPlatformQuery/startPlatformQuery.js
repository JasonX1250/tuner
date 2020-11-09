window.onload = async () => {
    loadMenu();
    addStartPlatformLogo();
    applyPlatformSpecifics();
    loadLogin();

    // add event listener to 'Search' button
    document.getElementById("search-btn").addEventListener("click", query);
};
const startPlatform = window.localStorage.getItem("startPlatform");

function addStartPlatformLogo() {
    const startPlatformLogo = document.getElementById("start-platform-logo");
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
            mediaTypeOptions = ["Video", "Playlist"];
            authorSynonym = "Channel";
            break;
        }

        case "Spotify": {
            mediaTypeOptions = ["Track", "Album", "Playlist"];
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

async function query() {
    let query = "queryMedia?";
    query += `platform=${startPlatform}`;
    if (document.getElementById("link").checked) {
        query += "&queryMethod=link";
        query += `&link=${document.getElementById("media-link").value}`;
    } else {
        query += "&queryMethod=query";
        query += `&title=${document.getElementById("media-title").value}`;
        query += `&type=${document.getElementById("media-type").value}`;
        if (document.getElementById("author").value !== null || document.getElementById("author").value !== "") {
            query += `&author=${document.getElementById("author").value}`;
        }
    }
    const response = await fetch(`${url}/${query}`);
    if (response.ok) {
        const data = await response.json();
        window.localStorage.setItem("mediaToConvert", JSON.stringify(data));
        window.location.href = `${url}/startQueryResults`;
    }
}