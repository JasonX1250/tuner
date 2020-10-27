window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    addPlatformLogos();
    showSuccess();
}

const platformLogos = document.getElementById("platform-logos");
let addedToPlaylistsSuccess = false;

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

function showSuccess() {
    const success = document.getElementById("success");
    if (addedToPlaylistsSuccess) {
        success.appendChild(document.createTextNode("\u2714 "));
        const text = document.createElement("span");
        text.appendChild(document.createTextNode("Done"));
        text.classList.add("success-text");
        success.appendChild(text);
    } else {
        success.appendChild(document.createTextNode("\u2717 "));
        const text1 = document.createElement("div");
        text1.appendChild(document.createTextNode("Something went wrong while adding"));
        text1.classList.add("failure-text");
        const text2 = document.createElement("div");
        text2.appendChild(document.createTextNode("the converted media to the playlist"));
        text2.classList.add("failure-text");
        success.appendChild(text1);
        success.appendChild(text2);
    }
}
