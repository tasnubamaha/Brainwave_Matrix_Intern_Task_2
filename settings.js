document.addEventListener("DOMContentLoaded", () => {
    // Log the localStorage to check the stored data
    console.log("localStorage: ", localStorage);

    // Retrieve the loggedInUser data from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // Parse the JSON string to an object
        const user = JSON.parse(loggedInUser);

        // Populate the form fields with the username and email from the loggedInUser
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;

        console.log("User data found:", user);
    } else {
        console.log("User data not found in localStorage");
    }

    // Add event listener for Save button
    document.querySelector('.save-btn').addEventListener('click', () => {
        alert('Settings saved successfully!');
    });
});
