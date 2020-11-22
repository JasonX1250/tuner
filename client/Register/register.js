window.onload = async () => {
    loadMenu();

    // add event listener to 'Search' button
    document.getElementById("register-btn").addEventListener("click", () => {
        if (document.getElementById("username").value !== null && document.getElementById("username").value !== "" &&
            document.getElementById("password").value !== null && document.getElementById("password").value !== "") {
                register();
        } else {
                window.alert("Empty fields not allowed.");
        }
    });
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
    if (response.ok) {
        const data = await response.json();
        if (data.success) {
            window.location.href = `${url}`;
        } else {
            window.alert("User already exists.");
        }
    }

}