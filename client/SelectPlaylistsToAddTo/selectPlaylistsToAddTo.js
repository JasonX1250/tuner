window.onload = async () => {
    loadMenu();
    addPlatformLogos();
    loadLogin();

    const response = await fetch(`${url}/getSavedPlaylists?userId=${window.localStorage.getItem("userId")}`);
    console.log(response);
    if (response.ok) {
        window.localStorage.setItem("playlistsFound", JSON.stringify(await response.json()));        
    }

    addFoundPlaylists();

    // add event listener to continue button
    document.getElementById("add-to-playlists-btn").addEventListener("click", finalizeSelection);
    document.getElementById("go-back-btn").addEventListener("click", () => {
        window.location.href = `${url}/playlistQuery`;
    });
}

const playlistsToAddTo = [];

function addPlatformLogos() {
    const startPlatform = window.localStorage.getItem("startPlatform");
    const endPlatform = window.localStorage.getItem("endPlatform");
    const platformLogos = document.getElementById("platform-logos");
    const startPlatformImg = document.createElement("img");
    startPlatformImg.id = "start-platform-icon";
    startPlatformImg.src = `../Logos/${startPlatform}.jpg`;
    platformLogos.appendChild(startPlatformImg);
    const startPlatformText = document.createElement("div");
    startPlatformText.classList.add("platform-name");
    startPlatformText.appendChild(document.createTextNode(`${startPlatform}  \u2192  `));
    platformLogos.appendChild(startPlatformText);
    const endPlatformImg = document.createElement("img");
    endPlatformImg.id = "end-platform-icon";
    endPlatformImg.src = `../Logos/${endPlatform}.jpg`;
    platformLogos.appendChild(endPlatformImg);
    const endPlatformText = document.createElement("div");
    endPlatformText.classList.add("platform-name");
    endPlatformText.appendChild(document.createTextNode(`${endPlatform}`));
    platformLogos.appendChild(endPlatformText);
}

function addFoundPlaylists() {
    for (const media of JSON.parse(window.localStorage.getItem("playlistsFound"))) {
        // container for each result
        const result = document.createElement("div");
        result.classList.add("row", "result");
        // image or thumbnail for each result
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("col-2", "thumbnail");
        const img = document.createElement("img");
        img.classList.add("media-img");
        img.src = media.img;
        imgDiv.appendChild(img);
        result.appendChild(imgDiv);
        // general information for each result
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("col-6");
        const title = document.createElement("strong");
        title.appendChild(document.createTextNode(`${media.title}`));
        title.classList.add("row", "media-title");
        infoDiv.appendChild(title);
        const length = document.createElement("div");
        length.appendChild(document.createTextNode(`Length: ${media.length}`));
        length.classList.add("row");
        infoDiv.appendChild(length);
        const addedOn = document.createElement("div");
        addedOn.appendChild(document.createTextNode(`Added On: ${media.added}`));
        addedOn.classList.add("row");
        infoDiv.appendChild(addedOn);
        result.appendChild(infoDiv);
        // select button for each result
        const selectBtnDiv = document.createElement("div");
        selectBtnDiv.classList.add("col-1");
        const selectBtn = document.createElement("button");
        selectBtn.classList.add("btn", "btn-danger");
        selectBtn.appendChild(document.createTextNode("Select"));
        selectBtn.addEventListener("click", () => {
            selectMedia(selectBtn, media);
        });
        selectBtnDiv.appendChild(selectBtn);
        result.appendChild(selectBtnDiv);
        // add each result to the search-results container
        document.getElementById("playlists-found").appendChild(result);
    }
}

function selectMedia(selectBtn, media) {
    if (playlistsToAddTo.includes(media)) {
        playlistsToAddTo.splice(playlistsToAddTo.indexOf(media), 1);
        selectBtn.classList.remove("selected");
        selectBtn.classList.add("btn-danger");
        while (selectBtn.hasChildNodes()) {
            selectBtn.removeChild(selectBtn.firstChild);
        }
        selectBtn.appendChild(document.createTextNode("Select"));
    } else {
        playlistsToAddTo.push(media);
        selectBtn.classList.add("selected");
        selectBtn.classList.remove("btn-danger");
        while (selectBtn.hasChildNodes()) {
            selectBtn.removeChild(selectBtn.firstChild);
        }
        selectBtn.appendChild(document.createTextNode("Selected"));
    }
}

async function finalizeSelection() {
    if (playlistsToAddTo.length >= 1) {
        window.localStorage.setItem("playlistsToAddTo", JSON.stringify(playlistsToAddTo));
        const response = await fetch(`${url}/addToPlaylists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                media: JSON.parse(window.localStorage.getItem("selectedConvertedMedia")),
                playlists: JSON.parse(window.localStorage.getItem("playlistsToAddTo"))
            })
        });
        if (response.ok) {
            const data = await response.json();
            window.localStorage.setItem("playlistsAddedTo", JSON.stringify(data));
            window.location.href = `${url}/addToPlaylistsResults`;
        }
    } else {
        window.alert("You must select at least one piece of media to add to playlists.");
    }
}