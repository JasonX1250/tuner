window.onload = async () => {
    loadMenu();
    await loadPlaylistsFound();
    addFoundPlaylists();
    loadLogin();
}

let playlists = [];

async function loadPlaylistsFound() {
    const response = await fetch(`${url}/getSavedPlaylists?userId=${window.localStorage.getItem("userId")}`);
    if (response.ok) {
        const data = await response.json();
        playlists = data;
    }
}

function addFoundPlaylists() {
    for (const p of playlists) {
        // container for each result
        const result = document.createElement("div");
        result.classList.add("row", "result");
        // image or thumbnail for each result
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("col-1");
        const img = document.createElement("img");
        img.src = p.img;
        imgDiv.appendChild(img);
        result.appendChild(imgDiv);
        // general information for each result
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("col-4");
        const title = document.createElement("strong");
        title.appendChild(document.createTextNode(`${p.title}`));
        title.classList.add("row", "media-title");
        infoDiv.appendChild(title);
        const author = document.createElement("div");
        author.appendChild(document.createTextNode(`${p.author}`));
        author.classList.add("row");
        infoDiv.appendChild(author);
        const duration = document.createElement("div");
        duration.appendChild(document.createTextNode(`${p.duration}`));
        duration.classList.add("row");
        infoDiv.appendChild(duration);
        const link = document.createElement("a");
        link.href = `${p.link}`;
        link.appendChild(document.createTextNode(`${p.link}`));
        link.classList.add("row");
        infoDiv.appendChild(link);
        result.appendChild(infoDiv);
        // add buttons for each result
        const options = ["Convert Platforms", "Add to Playlists", "Delete"];
        for (opt of options) {
            const selectBtnDiv = document.createElement("div");
            selectBtnDiv.classList.add("col-2");
            const selectBtn = document.createElement("button");
            if (opt === "Delete") {
                selectBtn.classList.add("btn", "btn-danger");
            } else {
                selectBtn.classList.add("btn", "btn-primary");
            }
            selectBtn.appendChild(document.createTextNode(opt));
            // add event listeners for each button
            if (opt === "Convert Platforms") {
                selectBtn.addEventListener("click", () => {
                    window.localStorage.setItem("startPlatform", p.platform);
                    window.localStorage.setItem("mediaToConvert", JSON.stringify(p));
                    window.location.href = `${url}/selectEndPlatforms`;
                });
            } else if (opt === "Add to Playlists") {
                selectBtn.addEventListener("click", () => {
                    window.localStorage.setItem("endPlatform", p.platform);
                    window.localStorage.setItem("selectedConvertedMedia", JSON.stringify(p));
                    window.location.href = `${url}/playlistQuery`;
                });
            } else if (opt === "Delete") {
                selectBtn.addEventListener("click", async () => {
                    const response = await fetch(`${url}/deleteSavedPlaylist`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify({
                            userId: window.localStorage.getItem("userId"),
                            auth: window.localStorage.getItem("authToken"),
                            playlistId: p.playlistId
                        })
                    });
                    if (response.ok) {
                        window.location.reload();
                    }
                });
            }
            selectBtnDiv.appendChild(selectBtn);
            result.appendChild(selectBtnDiv);
        }
        // add each result to the search-results container
        document.getElementById("playlists-found").appendChild(result);
    }
}
