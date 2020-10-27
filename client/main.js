const availablePlatforms = ["Spotify", "YouTube"];
let startPlatform = "";
let endPlatforms = [];
let mediaToConvert = [];
let convertedMedia = [];
let selectedConvertedMedia = [];
let playlistsFound = [];
let playlistsToAddTo = [];

function loadMenu() {
    const menu = document.getElementById("menu");
    for (const platform of availablePlatforms) {
        const tab = document.createElement("a");
        tab.href = "../StartPlatformQuery/startPlatformQuery.html";
        tab.onclick = setStartPlatform(platform);
        tab.appendChild(document.createTextNode(`${platform}`));
        menu.appendChild(tab);
    }
}

function loadMenuFromHome() {
    const menu = document.getElementById("menu");
    for (const platform of availablePlatforms) {
        const tab = document.createElement("a");
        tab.href = "StartPlatformQuery/startPlatformQuery.html";
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
    const storedEndPlatforms = window.localStorage.getItem("endPlatforms");
    if (storedEndPlatforms !== null) {
        endPlatforms = JSON.parse(storedEndPlatforms);
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
    endPlatforms = [];
    mediaToConvert = [];
    window.localStorage.clear();
}