const availablePlatforms = ["Spotify", "YouTube"];
let startPlatform = "";
let endPlatforms = [];
let mediaToConvert = [];

window.onload = () => {
    loadMenu();
    loadPlatforms();
};

function loadMenu() {
    const menu = document.getElementById("menu");
    for (const platform of availablePlatforms) {
        const tab = document.createElement("a");
        tab.href = "startPlatformQuery.html";
        tab.onclick = setStartPlatform(platform);
        tab.appendChild(document.createTextNode(`${platform}`));
        menu.appendChild(tab);
    }
}

function setStartPlatform(platform) {
    startPlatform = platform;
    window.localStorage.setItem("startPlatform", startPlatform);
}

function setMediaToConvert(media) {
    mediaToConvert = media;
    window.localStorage.setItem("mediaToConvert", JSON.stringify(mediaToConvert));
}

function loadPlatforms() {
    const storedStartPlatform = window.localStorage.getItem("startPlatform");
    if (storedStartPlatform !== null) {
        startPlatform = storedStartPlatform;
    }
    const storedEndPlatform = window.localStorage.getItem("endPlatform");
    if (storedEndPlatform !== null) {
        endPlatform = storedEndPlatform;
    }
}

function loadMediaToConvert() {
    const storedMediaToConvert = JSON.parse(window.localStorage.getItem("mediaToConvert"));
    if (storedMediaToConvert !== null) {
        mediaToConvert = storedMediaToConvert;
    }
}

function reset() {
    startPlatform = "";
    endPlatform = "";
    mediaToConvert = [];
    window.localStorage.clear();
}