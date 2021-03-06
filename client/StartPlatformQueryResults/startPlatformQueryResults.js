window.onload = async () => {
    await loadMenu();
    addStartPlatformLogo();
    addSearchResults();
    loadLogin();

    document.getElementById("go-back-btn").addEventListener("click", () => { window.location.href = `${url}/startQuery`; });
}

const queriedMedia = JSON.parse(window.localStorage.getItem("queriedMedia"));

function addStartPlatformLogo() {
    const startPlatform = window.localStorage.getItem("startPlatform");
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

function addSearchResults() {
    for (const media of queriedMedia) {
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
        const author = document.createElement("div");
        author.appendChild(document.createTextNode(`${media.author}`));
        author.classList.add("row");
        infoDiv.appendChild(author);
        const link = document.createElement("a");
        link.href = `${media.link}`;
        link.appendChild(document.createTextNode(`${media.link.substring(0, 30)}${(media.link.length > 30 ? "..." : "")}`));
        link.classList.add("row");
        infoDiv.appendChild(link);
        result.appendChild(infoDiv);
        // select button for each result
        const selectBtnDiv = document.createElement("div");
        selectBtnDiv.classList.add("col-1");
        const selectBtn = document.createElement("button");
        selectBtn.addEventListener("click", () => { selectMedia(media); });
        selectBtn.classList.add("btn", "btn-primary");
        selectBtn.appendChild(document.createTextNode("Select"));
        selectBtnDiv.appendChild(selectBtn);
        result.appendChild(selectBtnDiv);
        // add each result to the search-results container
        document.getElementById("search-results").appendChild(result);
    }
}

function selectMedia(media) {
    window.localStorage.setItem("mediaToConvert", JSON.stringify(media));
    window.location.href = `${url}/selectEndPlatforms`;
}
