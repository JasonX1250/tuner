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
        tab.addEventListener("click", ()=> { setStartPlatform(platform); });
        tab.appendChild(document.createTextNode(`${platform}`));
        menu.appendChild(tab);
    }
}

function loadLogin() {
    const auth = window.localStorage.getItem("auth");
    // check auth with fetch, add && to if
    const login = document.getElementById("login");
    while (login.hasChildNodes()) {
        login.removeChild(login.firstChild);
    }
    if (auth != null) {
        login.appendChild(document.createTextNode("Logout"));
        window.localStorage.removeItem("auth")
        window.location.reload();
    } else {
        login.appendChild(document.createTextNode("Login"));
        login.addEventListener("click", () => { window.location.href = `${url}/login`; });
    }
}