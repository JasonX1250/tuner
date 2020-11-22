window.onload = async () => {
    loadMenu();
    //loadLogin();

    // add event listener to 'Search' button
    document.getElementById("login-btn").addEventListener("click", login);
    //document.getElementById("register-btn").addEventListener("click", register);
}

async function login() {
    if (document.getElementById("username").value.length === 0 || document.getElementById("password").value.length === 0)
    {   
        alert("User name or password can't be blank");
    }
    // const response = await fetch(`${url}/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json;charset=utf-8"
    //     },
    //     body: JSON.stringify({
    //         username: document.getElementById("username").value,
    //         password: document.getElementById("password").value

    //     })
    // });
    // if (response.ok) {
    //     console.log("got here login");
    //     console.log(response);
    //     // window.localStorage.setItem("userId", data.userId);
    //     // window.localStorage.setItem("authToken", data.authToken);
    //     // window.location.href = `${url}`;
    //     // passport.authenticate('local', {successRedirect: `${url}`,
    //     //                            failureRedirect: '/login'});
    // }
}

