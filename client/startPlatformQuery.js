window.onload = async () => {
    await loadMenu();
    await loadPlatforms();
    await searchinfo();
}

document.getElementById("search").addEventListener("click",searchinfo);

function searchinfo() {
    const link = document.getElementById("link").value;
    const type = document.getElementById("qType").value;  
    const content = document.getElementById("qTitle").value;
    const channel = document.getElementById("link-channel").value;
    return link,type,content,channel;
}



