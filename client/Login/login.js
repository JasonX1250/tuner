window.onload = async () => {
    await loadPlatforms();
    await loadMenu();
    loadLogin();

    // add event listener to 'Search' button
    document.getElementById("login-btn").addEventListener("click", login);
}

async function login() {
    const response = await fetch(`${url}/getAuth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value

        })
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        // store auth token somewhere
        // redirect page
    }
}