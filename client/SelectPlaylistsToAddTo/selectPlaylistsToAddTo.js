window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    await loadPlaylistsFound();
    addPlatformLogos();
    addFoundPlaylists();
    
    // add event listener to continue button
    document.getElementById("add-to-playlists-btn").addEventListener("click", finalizeSelection);
}

const platformLogos = document.getElementById("platform-logos");
const playlistsFoundContainer = document.getElementById("playlists-found");

function loadPlaylistsFound() {
    const storedPlaylistsFound = window.localStorage.getItem("playlistsFound");
    if (storedPlaylistsFound !== null) {
        playlistsFound = JSON.parse(storedPlaylistsFound);
    }
}

function addPlatformLogos() {
    for (const endPlatform of endPlatforms) {
        const startPlatformImg = document.createElement("img");
        startPlatformImg.id="start-platform-icon";
        startPlatformImg.src = `../Logos/${startPlatform}.jpg`;
        platformLogos.appendChild(startPlatformImg);
        const startPlatformText = document.createElement("div");
        startPlatformText.classList.add("platform-name");
        startPlatformText.appendChild(document.createTextNode(`${startPlatform}  \u2192  `));
        platformLogos.appendChild(startPlatformText);
        const endPlatformImg = document.createElement("img");
        endPlatformImg.id="end-platform-icon";
        endPlatformImg.src = `../Logos/${endPlatform}.jpg`;
        platformLogos.appendChild(endPlatformImg);
        const endPlatformText = document.createElement("div");
        endPlatformText.classList.add("platform-name");
        endPlatformText.appendChild(document.createTextNode(`${endPlatform}`));
        platformLogos.appendChild(endPlatformText);
    }
}

function addFoundPlaylists() {
    for (const media of playlistsFound) {
        // container for each result
        const result = document.createElement("div");
        result.classList.add("row", "result");
        // image or thumbnail for each result
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("col-1");
        const img = document.createElement("img");
        img.src = media.img;
        imgDiv.appendChild(img);
        result.appendChild(imgDiv);
        // general information for each result
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("col-4");
        const title = document.createElement("strong");
        title.appendChild(document.createTextNode(`${media.title}`));
        title.classList.add("row", "media-title");
        infoDiv.appendChild(title);
        const author = document.createElement("div");
        author.appendChild(document.createTextNode(`${media.author}`));
        author.classList.add("row");
        infoDiv.appendChild(author);
        const duration = document.createElement("div");
        duration.appendChild(document.createTextNode(`${media.duration}`));
        duration.classList.add("row");
        infoDiv.appendChild(duration);
        const link = document.createElement("a");
        link.href = `${media.link}`;
        link.appendChild(document.createTextNode(`${media.link}`));
        link.classList.add("row");
        infoDiv.appendChild(link);
        result.appendChild(infoDiv);
        // select button for each result
        const selectBtnDiv = document.createElement("div");
        selectBtnDiv.classList.add("col-1");
        const selectBtn = document.createElement("button");
        selectBtn.classList.add("btn", "btn-danger");
        selectBtn.appendChild(document.createTextNode("Select"));
        selectBtn.addEventListener("click", () => { selectMedia(selectBtn, media); });
        selectBtnDiv.appendChild(selectBtn);
        result.appendChild(selectBtnDiv);
        // add each result to the search-results container
        playlistsFoundContainer.appendChild(result);
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

function finalizeSelection() {
    if (playlistsToAddTo.length >= 1) {
        window.localStorage.setItem("playlistsToAddTo", JSON.stringify(playlistsToAddTo));
        // render next page
    } else {
        window.alert("You must select at least one piece of media to add to playlists.")
    }
}