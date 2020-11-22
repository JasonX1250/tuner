window.onload = async () => {
    loadMenu();

    // add event listener to 'Search' button
    document.getElementById("register-btn").addEventListener("click", register);
}

async function register() {
    if (document.getElementById("username").value.length === 0 ||
        document.getElementById("password").value.length === 0 )
        alert("User name or password can't be blank");
	const response = await fetch(`${url}/register`, {
		method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value

        })
    });

    console.log(response);
    // if (response.ok)
    // {
    //     console.log(response.body);
    // 	alert("user already exists");
    // }
    // else
    // {
    // 	window.location.href = `${url}/savedPlaylists`;
    // }
  
}