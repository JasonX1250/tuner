window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    await loadConvertedMedia();
    addPlatformLogos();
    addConvertedResults();
    
    // add event listener to continue button
    document.getElementById("add-to-playlists-btn").addEventListener("click", finalizeSelection);
}

const platformLogos = document.getElementById("platform-logos");
const convertedResults = document.getElementById("converted-results");

function loadConvertedMedia() {
    const storedConvertedMedia = window.localStorage.getItem("convertedMedia");
    if (storedConvertedMedia !== null) {
        convertedMedia = JSON.parse(storedConvertedMedia);
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
        endPlatformImg.src = `../Logos/${endPlatforms[0]}.jpg`;
        platformLogos.appendChild(endPlatformImg);
        const endPlatformText = document.createElement("div");
        endPlatformText.classList.add("platform-name");
        endPlatformText.appendChild(document.createTextNode(`${endPlatforms[0]}`));
        platformLogos.appendChild(endPlatformText);
    }
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
        selectBtn.addEventListener("click", () => { selectMedia(selectBtn, media); });
        selectBtnDiv.appendChild(selectBtn);
        result.appendChild(selectBtnDiv);
        // add each result to the search-results container
        convertedResults.appendChild(result);
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
        // render next page
    } else {
        window.alert("You must select at least one piece of media to add to playlists.")
    }
}
