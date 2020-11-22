const availablePlatforms = ["Spotify", "YouTube"];
// const url = "http://localhost:3000"
"https://tuner-app.herokuapp.com";

function openMenu() {
    document.getElementById("menu").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open-menu").style.visibility = "hidden";
}

function closeMenu() {
    document.getElementById("menu").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("open-menu").style.visibility = "visible";
}

function loadMenu() {
    const menu = document.getElementById("menu");
    for (const platform of availablePlatforms) {
        const tab = document.createElement("a");
        tab.href = "/startQuery";
        tab.addEventListener("click", ()=> { window.localStorage.setItem("startPlatform", platform); });
        tab.appendChild(document.createTextNode(`${platform}`));
        menu.appendChild(tab);
    }
}

function loadLogin() {
    const auth = window.localStorage.getItem("userId");
    // check auth with fetch, add && to if
    const login = document.getElementById("login");
    while (login.hasChildNodes()) {
        login.removeChild(login.firstChild);
    }
    if (auth !== null && auth !== "") {
        const menu = document.getElementById("menu");
        const tab = document.createElement("a");
        tab.href = "/savedPlaylists";
        tab.appendChild(document.createTextNode("Saved Playlists"));
        menu.prepend(tab);

        login.appendChild(document.createTextNode("Logout"));
        login.addEventListener("click", () => { 
            window.localStorage.removeItem("userId");
            window.location.href = "/";
        });
    } else {
        login.appendChild(document.createTextNode("Login"));
        login.addEventListener("click", () => { window.location.href = `${url}/login`; });
    }
}
