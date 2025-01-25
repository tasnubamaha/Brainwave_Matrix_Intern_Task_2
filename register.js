document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Create a user object
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
  
    // Get existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert("This email is already registered. Please log in instead.");
      window.location.href = "login.html"; // Redirect to login page
      return;
    }
  
    // Save new user to the `users` array in localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  
    // Set the newly registered user as the currently logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  
    alert("Registration successful! You are now logged in.");
    window.location.href = "profile.html"; // Redirect to profile page
  });
  