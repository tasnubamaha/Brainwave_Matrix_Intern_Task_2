document.addEventListener("DOMContentLoaded", () => {
    const notificationBtn = document.getElementById("notificationBtn");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const clearNotifications = document.getElementById("clearNotifications");
    const notificationBadge = document.getElementById("notificationBadge");

    // Toggle Popup
    notificationBtn.addEventListener("click", () => {
        popup.style.display = popup.style.display === "block" ? "none" : "block";
    });

    // Close Popup
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Clear Notifications
    clearNotifications.addEventListener("click", () => {
        const notificationList = document.querySelector(".notification-list");
        notificationList.innerHTML = "<p style='text-align:center; color:gray;'>No new notifications</p>";
        notificationBadge.textContent = "0";
    });
});
