document.getElementById("edit-profile").addEventListener("click", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    const newUsername = prompt("Enter new username:", loggedInUser.username);

    if (newUsername) {
      // Update the username in localStorage
      loggedInUser.username = newUsername;

      // Update the `users` array in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(user => user.email === loggedInUser.email);
      if (userIndex !== -1) {
        users[userIndex].username = newUsername;
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Update logged-in user details
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Update the UI
      document.getElementById("username").textContent = `Username: ${newUsername}`;
      alert("Profile updated successfully!");
    }
  } else {
    alert("No user is logged in! Please log in first.");
    window.location.href = "login.html";
  }
});

const profileCard = document.querySelector(".profile-card");
const uploadInput = document.getElementById("profile-picture-input");

// Load user data from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    document.getElementById("username").textContent = `Username: ${loggedInUser.username}`;
    document.getElementById("email").textContent = `Email: ${loggedInUser.email}`;

    // Load profile picture if it exists
    const profilePic = localStorage.getItem(`profilePicture-${loggedInUser.email}`);
    if (profilePic) {
      document.querySelector(".profile-card img").src = profilePic;
    } else {
      document.querySelector(".profile-card img").src = "default-profile-picture.png"; // Default profile picture
    }
  } else {
    alert("No user is logged in! Please log in first.");
    window.location.href = "login.html";
  }
});

// Handle profile picture upload
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (loggedInUser) {
        // Save profile picture using a unique key based on the user's email
        localStorage.setItem(`profilePicture-${loggedInUser.email}`, reader.result);
        document.querySelector(".profile-card img").src = reader.result;
        alert("Profile picture updated!");
      } else {
        alert("No user is logged in! Cannot update profile picture.");
      }
    };

    reader.readAsDataURL(file); // Convert image to base64
  }
});

// Logout functionality
document.getElementById("logout-button").addEventListener("click", function () {
  // Clear logged-in user session data
  localStorage.removeItem("loggedInUser");

  alert("You have successfully logged out.");
  window.location.href = "login.html"; // Redirect to the login page
});
