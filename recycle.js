let points = 0;

document.getElementById("recycleForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const recycledItems = parseInt(document.getElementById("recycledItems").value);

    if (recycledItems > 0) {
        const earnedPoints = recycledItems * 10; // 10 points per recycled item
        points += earnedPoints;

        document.getElementById("points").textContent = points;
        document.getElementById("rewardMessage").textContent = `You earned ${earnedPoints} points! Keep recycling!`;
    }
});

document.getElementById("redeemPoints").addEventListener("click", function () {
    if (points > 0) {
        alert(`You have redeemed ${points} points!`);
        points = 0;
        document.getElementById("points").textContent = points;
    } else {
        alert("You have no points to redeem!");
    }
});
