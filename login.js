document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Retrieve registered users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email and password match any registered user
    const validUser = existingUsers.find(user => user.email === email && user.password === password);

    if (validUser) {
        alert("Login successful!");
        // Save the logged-in user info to localStorage or sessionStorage (if needed)
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "index.html"; // Redirect to the dashboard or home page
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
