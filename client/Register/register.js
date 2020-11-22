window.onload = async () => {
    loadMenu();

    // add event listener to 'Search' button
    document.getElementById("register-btn").addEventListener("click", register);
}

async function register() {
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
    if (response.ok)
    {
    	alert("user already exists");
    	console.log("user already exists");
    }
    else
    {
    	window.location.href = `${url}/savedPlaylists`;
    }
  
}