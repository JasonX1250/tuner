window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    addStartPlatformLogo();
    addAvailableEndPlatforms();
}

const startPlatformLogo = document.getElementById("start-platform-logo");
const availableEndPlatforms = document.getElementById("end-platforms");

function addStartPlatformLogo() {
    const logo = document.createElement("img");
    logo.id="start-platform-icon";
    logo.src = `../Logos/${startPlatform}.jpg`;
    startPlatformLogo.appendChild(logo);
    const text = document.createElement("div");
    text.id = "start-platform-name";
    text.appendChild(document.createTextNode(`${startPlatform}  \u2192  ?`));
    startPlatformLogo.appendChild(text);
}

function addAvailableEndPlatforms() {
    for (const platform of availablePlatforms) {
        if (platform !== startPlatform) {
            const platformBtn = document.createElement("button");
            platformBtn.id = `${platform}-btn`;
            platformBtn.value = `${platform}`;
            platformBtn.classList.add("btn", "btn-primary", "btn-lg", "btn-block");
            platformBtn.appendChild(document.createTextNode(`${platform}`));
            if (endPlatforms.includes(platform)) {
                platformBtn.classList.add("selected-platform");
            } else {
                platformBtn.classList.add("not-selected-platform");
            }
            platformBtn.onclick = () => { selectPlatform(platform); };
            availableEndPlatforms.appendChild(platformBtn);
        }
    }
}

function selectPlatform(platform) {
    const platformBtn = document.getElementById(`${platform}-btn`);
    if (endPlatforms.includes(platform)) {
        endPlatforms.splice(endPlatforms.indexOf(platform), 1);
        platformBtn.classList.remove("selected-platform");
        platformBtn.classList.add("not-selected-platform");
    } else {
        endPlatforms.push(platform);
        platformBtn.classList.add("selected-platform");
        platformBtn.classList.remove("not-selected-platform");
    }
}