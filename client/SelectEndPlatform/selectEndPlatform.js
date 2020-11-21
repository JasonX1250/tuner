window.onload = async () => {
    loadMenu();
    addStartPlatformLogo();
    addAvailableEndPlatforms();
    loadLogin();

    // add button event listeners
    document.getElementById("go-back-btn").addEventListener("click", () => {
        window.location.href = `${url}/startQueryResults`;
    });
}

const startPlatform = window.localStorage.getItem("startPlatform");

function addStartPlatformLogo() {
    const startPlatformLogo = document.getElementById("start-platform-logo");
    const logo = document.createElement("img");
    logo.id = "start-platform-icon";
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
            platformBtn.classList.add("select-platform");
            platformBtn.onclick = () => {
                selectPlatform(platform);
            };
            document.getElementById("end-platforms").appendChild(platformBtn);
        }
    }
}

async function selectPlatform(platform) {
    window.localStorage.setItem("endPlatform", platform);
    const response = await fetch(`${url}/convertMedia`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            startPlatform: window.localStorage.getItem("startPlatform"),
            endPlatform: platform,
            media: JSON.parse(window.localStorage.getItem("mediaToConvert")),
            type: window.localStorage.getItem("mediaType")
        })
    });
    if (response.ok) {
        const data = await response.json();
        convertedMedia = data;
        window.localStorage.setItem("convertedMedia", JSON.stringify(convertedMedia));
        window.location.href = `${url}/convertedMedia`;
    }

}