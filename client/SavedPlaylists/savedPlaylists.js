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
        imgDiv.classList.add("col-2", "thumbnail");
        const img = document.createElement("img");
        img.classList.add("media-img");
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
        const length = document.createElement("div");
        length.appendChild(document.createTextNode(`Length: ${p.length}`));
        length.classList.add("row");
        infoDiv.appendChild(length);
        const addedOn = document.createElement("div");
        addedOn.appendChild(document.createTextNode(`Added On: ${p.added}`));
        addedOn.classList.add("row");
        infoDiv.appendChild(addedOn);
        result.appendChild(infoDiv);
        // add buttons for each result
        const options = ["Browse", "Delete"];
        for (opt of options) {
            const selectBtnDiv = document.createElement("div");
            selectBtnDiv.classList.add("col-1", "playlist-buttons");
            const selectBtn = document.createElement("button");
            if (opt === "Delete") {
                selectBtn.classList.add("btn", "btn-danger");
            } else {
                selectBtn.classList.add("btn", "btn-primary");
            }
            selectBtn.appendChild(document.createTextNode(opt));
            // add event listeners for each button
            if (opt === "Browse") {
                selectBtn.addEventListener("click", () => {
                    window.localStorage.setItem("browsePlaylist", JSON.stringify(p.list));
                    window.location.href = `${url}/browsePlaylist`;
                });
            } else if (opt === "Delete") {
                selectBtn.addEventListener("click", async () => {
                    console.log(JSON.stringify(p));
                    const response = await fetch(`${url}/deleteSavedPlaylist`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify({
                            userId: window.localStorage.getItem("userId"),
                            playlistId: p.id
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success) {
                            window.location.reload();
                        } else {
                            window.alert("Failed to delete playlist.")
                        }
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