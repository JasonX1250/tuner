window.onload = async () => {
    loadMenu();
    loadLogin();

    // add event listener to 'Search' button
    document.getElementById("login-btn").addEventListener("click", login);
}

async function login() {
    const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value

        })
    });
    // if (response.ok) {
    //     passport.authenticate('local', {
    //         successRedirect: `${url}`,
    //         failureRedirect: '/login'
    //     });
    // }
    if (response.ok) {
        const data = await response.json();
        window.localStorage.setItem("userId", data.userId);
        window.location.href = `${url}`;
    }
}