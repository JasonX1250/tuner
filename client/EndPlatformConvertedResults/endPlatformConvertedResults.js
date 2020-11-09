window.onload = async () => {
    loadMenu();
    addPlatformLogos();
    addConvertedResults();
    loadLogin();

    // add event listener to continue button
    document.getElementById("add-to-playlists-btn").addEventListener("click", finalizeSelection);
    document.getElementById("go-back-btn").addEventListener("click", () => {
        window.location.href = `${url}/selectEndPlatforms`;
    });
    document.getElementById("save-playlist-btn").addEventListener("click", savePlaylist);
}

const convertedMedia = JSON.parse(window.localStorage.getItem("convertedMedia"));
const selectedConvertedMedia = [];

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

function addConvertedResults() {
    for (const media of convertedMedia) {
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
        selectBtn.addEventListener("click", () => {
            selectMedia(selectBtn, media);
        });
        selectBtnDiv.appendChild(selectBtn);
        result.appendChild(selectBtnDiv);
        // add each result to the search-results container
        document.getElementById("converted-results").appendChild(result);
    }
}

function selectMedia(selectBtn, media) {
    if (selectedConvertedMedia.includes(media)) {
        selectedConvertedMedia.splice(selectedConvertedMedia.indexOf(media), 1);
        selectBtn.classList.remove("selected");
        selectBtn.classList.add("btn-danger");
        while (selectBtn.hasChildNodes()) {
            selectBtn.removeChild(selectBtn.firstChild);
        }
        selectBtn.appendChild(document.createTextNode("Select"));
    } else {
        selectedConvertedMedia.push(media);
        selectBtn.classList.add("selected");
        selectBtn.classList.remove("btn-danger");
        while (selectBtn.hasChildNodes()) {
            selectBtn.removeChild(selectBtn.firstChild);
        }
        selectBtn.appendChild(document.createTextNode("Selected"));
    }
}

function finalizeSelection() {
    if (selectedConvertedMedia.length >= 1) {
        window.localStorage.setItem("selectedConvertedMedia", JSON.stringify(selectedConvertedMedia));
        window.location.href = `${url}/playlistQuery`;
    } else {
        window.alert("You must select at least one piece of media to add to playlists.");
    }
}

async function savePlaylist() {
    if (selectedConvertedMedia.length < 1) {
        window.alert("You must select at least one piece of media to add to playlists.");
        return;
    }
    const response = await fetch(`${url}/savePlaylist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            userId: window.localStorage.getItem("userId"),
            auth: window.localStorage.getItem("authToken"),
            title: document.getElementById("collection-title").value,
            media: selectedConvertedMedia,
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.playlistId === -1) {
            window.alert("Failed to save playlist on Tuner.");
        } else {
            window.alert(`The playlist "${document.getElementById("collection-title").value}" has been successfully saved on Tuner.`)
        }
    }
}