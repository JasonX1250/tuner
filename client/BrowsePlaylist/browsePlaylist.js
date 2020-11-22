window.onload = async () => {
    await loadMenu();
    addSearchResults();
    loadLogin();

    document.getElementById("go-back-btn").addEventListener("click", () => { window.location.href = `${url}/savedPlaylists`; });
}

const playlist = JSON.parse(window.localStorage.getItem("browsePlaylist"));

function addSearchResults() {
    for (const media of playlist) {
        // container for each result
        const result = document.createElement("div");
        result.classList.add("row", "result");
        // image or thumbnail for each result
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("col-2", "thumbnail");
        const img = document.createElement("img");
        img.classList.add("media-img");
        img.src = media.img;
        imgDiv.appendChild(img);
        result.appendChild(imgDiv);
        // general information for each result
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("col-6");
        const title = document.createElement("strong");
        title.appendChild(document.createTextNode(`${media.title}`));
        title.classList.add("row", "media-title");
        infoDiv.appendChild(title);
        const author = document.createElement("div");
        author.appendChild(document.createTextNode(`${media.author}`));
        author.classList.add("row");
        infoDiv.appendChild(author);
        const link = document.createElement("a");
        link.href = `${media.link}`;
        link.appendChild(document.createTextNode(`${media.link.substring(0, 30)}${(media.link.length > 30 ? "..." : "")}`));
        link.classList.add("row");
        infoDiv.appendChild(link);
        result.appendChild(infoDiv);
        // add each result to the search-results container
        document.getElementById("playlist-results").appendChild(result);
    }
}
