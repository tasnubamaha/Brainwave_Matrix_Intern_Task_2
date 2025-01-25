document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const cardContainer = document.querySelector(".card-container");

    // Ensure cardContainer exists before proceeding
    if (!cardContainer) {
        console.error("Card container not found!");
        return;
    }

    const allCards = Array.from(cardContainer.children);
    let itemsToShow = 4;

    // Display initial items
    allCards.forEach((card, index) => {
        card.style.display = index < itemsToShow ? "block" : "none";
    });

    // Load More button functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            itemsToShow += 4;
            allCards.forEach((card, index) => {
                if (index < itemsToShow) {
                    card.style.display = "block";
                }
            });

            if (itemsToShow >= allCards.length) {
                loadMoreBtn.style.display = "none";
            }
        });
    } else {
        console.error("Load More button not found!");
    }

    // Add to Cart functionality using Event Delegation
    cardContainer.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("add-to-cart")) {
            addToCart(event.target);
        }
    });

    // Render cart on cart page
    const cartContainer = document.getElementById("cartContainer");
    if (cartContainer) {
        renderCartItems();
    }

    // Handle checkout button
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", handleCheckout);
    }
});

// Store cart items globally
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Add to Cart
function addToCart(button) {
    const card = button.closest(".card");
    if (!card) {
        console.error("Card not found!");
        return;
    }

    const itemName = card.getAttribute("data-name");
    const itemPrice = parseFloat(card.querySelector(".price").textContent.replace("$", ""));
    const itemImage = card.querySelector("img").src;

    if (!itemName || isNaN(itemPrice)) {
        console.error("Invalid item data");
        return;
    }

    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        // Item already in cart, update quantity
        existingItem.quantity += 0;
    } else {
        // New item, add to the cart
        cartItems.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
        alert("Item added to cart!"); // Show alert only for new items
    }

    // Save cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update cart count
    updateCartCount();
}


// Update Cart Count
function updateCartCount() {
    const cartCountSpan = document.querySelector(".cart-count");
    if (cartCountSpan) {
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalQuantity;
    }
}

// Render Cart Items
function renderCartItems() {
    const cartContainer = document.getElementById("cartContainer");
    if (!cartContainer) return;

    const emptyMessage = document.getElementById("emptyMessage");

    // Clear previous items
    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartContainer.appendChild(emptyMessage);
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    const totalPriceDiv = document.getElementById("totalPrice");
    if (totalPriceDiv) {
        totalPriceDiv.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

// Remove from Cart
function removeFromCart(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
    updateCartCount();
}


// Handle Checkout
function handleCheckout() {
    const cartContainer = document.getElementById("cartContainer");
    const totalPriceDiv = document.getElementById("totalPrice");

    // Clear cart
    cartItems = [];
    localStorage.removeItem("cartItems");

    // Provide feedback and reset UI
    if (cartContainer) cartContainer.innerHTML = '<p style="background-color:#754E1A; ">Your cart is empty!</p>';
    if (totalPriceDiv) totalPriceDiv.textContent = "";

    updateCartCount();  // Update the cart count to 0
    alert("Purchase successful! Thank you for shopping.");
}


 // Initialize the map
 document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Adding markers for 20 coffee-producing countries

    // Kenya
    L.marker([-1.286389, 36.817223]).addTo(map).bindPopup(
        "<strong>Kenya</strong><br>Known for rich coffee flavors!"
    );
    
    // Brazil
    L.marker([-14.235004, -51.92528]).addTo(map).bindPopup(
        "<strong>Brazil</strong><br>Largest coffee producer!"
    );

    // Ethiopia
    L.marker([9.145, 40.489673]).addTo(map).bindPopup(
        "<strong>Ethiopia</strong><br>Birthplace of Arabica coffee!"
    );

    // Colombia
    L.marker([4.570868, -74.297333]).addTo(map).bindPopup(
        "<strong>Colombia</strong><br>Famous for its rich and smooth coffee!"
    );

    // Vietnam
    L.marker([14.058324, 108.277199]).addTo(map).bindPopup(
        "<strong>Vietnam</strong><br>Second-largest coffee producer globally!"
    );

    // Indonesia
    L.marker([-0.789275, 113.921327]).addTo(map).bindPopup(
        "<strong>Indonesia</strong><br>Known for robusta coffee!"
    );

    // Guatemala
    L.marker([15.783471, -90.230759]).addTo(map).bindPopup(
        "<strong>Guatemala</strong><br>Famous for high-altitude coffee cultivation!"
    );

    // Honduras
    L.marker([13.924019, -83.003103]).addTo(map).bindPopup(
        "<strong>Honduras</strong><br>Produces high-quality Arabica coffee!"
    );

    // Peru
    L.marker([-9.19, -75.015]).addTo(map).bindPopup(
        "<strong>Peru</strong><br>Rich in organic coffee production!"
    );

    // Mexico
    L.marker([23.634501, -102.552783]).addTo(map).bindPopup(
        "<strong>Mexico</strong><br>Known for producing rich coffee beans!"
    );

    // Costa Rica
    L.marker([9.748917, -83.753428]).addTo(map).bindPopup(
        "<strong>Costa Rica</strong><br>Renowned for high-quality Arabica coffee!"
    );

    // India
    L.marker([20.593684, 78.96288]).addTo(map).bindPopup(
        "<strong>India</strong><br>Known for its monsoon coffee!"
    );

    // Rwanda
    L.marker([-1.940278, 29.873888]).addTo(map).bindPopup(
        "<strong>Rwanda</strong><br>Produces high-quality Arabica coffee!"
    );

    // Tanzania
    L.marker([-6.369028, 34.888822]).addTo(map).bindPopup(
        "<strong>Tanzania</strong><br>Known for Kilimanjaro coffee!"
    );

    // Uganda
    L.marker([1.373333, 32.290275]).addTo(map).bindPopup(
        "<strong>Uganda</strong><br>One of Africa's largest coffee producers!"
    );

    // Yemen
    L.marker([15.552727, 48.516388]).addTo(map).bindPopup(
        "<strong>Yemen</strong><br>Origin of the world's first cultivated coffee!"
    );

    // Papua New Guinea
    L.marker([-6.314993, 143.95555]).addTo(map).bindPopup(
        "<strong>Papua New Guinea</strong><br>Known for high-quality Arabica!"
    );

    // Nicaragua
    L.marker([12.865416, -85.207229]).addTo(map).bindPopup(
        "<strong>Nicaragua</strong><br>Produces strong coffee with unique flavors!"
    );

    // El Salvador
    L.marker([13.794185, -88.89653]).addTo(map).bindPopup(
        "<strong>El Salvador</strong><br>Famous for smooth and medium-bodied coffee!"
    );

    // Thailand
    L.marker([15.870032, 100.992541]).addTo(map).bindPopup(
        "<strong>Thailand</strong><br>Specializes in organic coffee!"
    );

    // China
    L.marker([35.86166, 104.195397]).addTo(map).bindPopup(
        "<strong>China</strong><br>Emerging coffee producer with growing quality!"
    );
});

 