const availablePlatforms = ["Spotify", "YouTube"];
let startPlatform = "";

window.onload = () => {
    loadMenu();
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
}
