window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    addStartPlatformLogo();
    addAvailableEndPlatforms();

    // add button event listeners
    document.getElementById("continue-btn").addEventListener("click", finalizeSelection);
    document.getElementById("go-back-btn").addEventListener("click", () => { window.location.href = `${url}/startQueryResults` });
}

const startPlatformLogo = document.getElementById("start-platform-logo");
const availableEndPlatforms = document.getElementById("end-platforms");
endPlatforms = [];

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

async function finalizeSelection() {
    if (endPlatforms.length >= 1) {
        window.localStorage.setItem("endPlatforms", JSON.stringify(endPlatforms));
        const response = await fetch(`${url}/convertMedia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                platform: startPlatform,
                media: mediaToConvert
            })
        });
        if (response.ok) {
            const data = await response.json();
            convertedMedia = data;
            window.localStorage.setItem("convertedMedia", JSON.stringify(convertedMedia));
            window.location.href =`${url}/convertedMedia`;
        }
    } else {
        window.alert("You must select at least one of the listed platforms.")
    }
}
