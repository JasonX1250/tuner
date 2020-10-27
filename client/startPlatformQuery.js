window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    await loadMediaToConvert();
    addStartPlatformLogo();
}

const startPlatformLogo = document.getElementById("start-platform-logo");

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

