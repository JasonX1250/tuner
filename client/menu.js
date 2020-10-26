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
