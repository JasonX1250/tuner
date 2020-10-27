window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    await loadMediaToConvert();
    addStartPlatformLogo();
    addSearchResults();
}

const startPlatformLogo = document.getElementById("start-platform-logo");
const searchResults = document.getElementById("search-results");

function addStartPlatformLogo() {
    console.log(startPlatformLogo);
    const logo = document.createElement("img");
    logo.id="start-platform-icon";
    logo.src = `../Logos/${startPlatform}.jpg`;
    startPlatformLogo.appendChild(logo);
    const text = document.createElement("div");
    text.id = "start-platform-name";
    text.appendChild(document.createTextNode(`${startPlatform}`));
    startPlatformLogo.appendChild(text);
}

function addSearchResults() {
    for (const media of mediaToConvert) {
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
        selectBtn.classList.add("btn", "btn-primary");
        selectBtn.appendChild(document.createTextNode("Select"));
        selectBtnDiv.appendChild(selectBtn);
        result.appendChild(selectBtnDiv);
        console.log(result.outerHTML);
        // add each result to the search-results container
        searchResults.appendChild(result);
    }
}
