const availablePlatforms = ["Spotify", "YouTube"];
let startPlatform = "";
let endPlatform = "";

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

function setEndPlatform(platform) {
    endPlatform = platform;
    window.localStorage.setItem("endPlatform", endPlatform);
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

function reset() {
    startPlatform = "";
    endPlatform = "";
    window.localStorage.clear();
}