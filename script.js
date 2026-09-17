/* =====================================================
   PAUL AND RON SHOE SHOP
   SHOPPING CART + CHECKOUT SYSTEM
===================================================== */


/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "Classic Runner",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        newArrival: true
    },

    {
        id: 2,
        name: "Urban Sneakers",
        price: 2899,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
        newArrival: true
    },

    {
        id: 3,
        name: "Street Classic",
        price: 2199,
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=800&q=80",
        newArrival: false
    },

    {
        id: 4,
        name: "Performance Shoe",
        price: 3299,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        newArrival: true
    },

    {
        id: 5,
        name: "Daily Comfort",
        price: 1999,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
        newArrival: false
    },

    {
        id: 6,
        name: "Modern Runner",
        price: 2999,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
        newArrival: true
    },

    {
        id: 7,
        name: "Sport Flex",
        price: 2699,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
        newArrival: false
    },

    {
        id: 8,
        name: "Premium Trainer",
        price: 3499,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
        newArrival: true
    }
];


/* ================= CART ================= */

let cart = [];


/* ================= ELEMENTS ================= */

const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");

const checkoutOverlay = document.getElementById("checkoutOverlay");
const closeCheckout = document.getElementById("closeCheckout");

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

const checkoutForm = document.getElementById("checkoutForm");

const successOverlay = document.getElementById("successOverlay");
const successMessage = document.getElementById("successMessage");
const continueShopping = document.getElementById("continueShopping");

const toast = document.getElementById("toast");


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {

    return "₱" + price.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


/* ================= SHOW PRODUCTS ================= */

function displayProducts() {

    const allProducts = document.getElementById("allProducts");
    const newProducts = document.getElementById("newProducts");

    allProducts.innerHTML = "";
    newProducts.innerHTML = "";

    products.forEach(product => {

        const productHTML = `
            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-price">
                        ${formatPrice(product.price)}
                    </p>

                    <button
                        class="add-cart-button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        allProducts.innerHTML += productHTML;

        if (product.newArrival) {
            newProducts.innerHTML += productHTML;
        }

    });

}


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    showToast("Added to cart");

}


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;color:#777;">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${formatPrice(item.price)}
                    </p>

                    <span>
                        Quantity: ${item.quantity}
                    </span>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;

    });


    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);

}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}


/* ================= CART EVENTS ================= */

cartButton.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartSidebar
);

cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =====================================================
   CHECKOUT
===================================================== */


/* ================= OPEN CHECKOUT ================= */

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        showToast("Your cart is empty.");

        return;
    }

    closeCartSidebar();

    displayCheckoutItems();

    checkoutOverlay.classList.add("active");

});


/* ================= CLOSE CHECKOUT ================= */

closeCheckout.addEventListener(
    "click",
    function() {

        checkoutOverlay.classList.remove("active");

    }
);


/* ================= CHECKOUT ITEMS ================= */

function displayCheckoutItems() {

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-summary-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </div>
        `;

    });

    checkoutTotal.textContent =
        formatPrice(total);

}


/* =====================================================
   PAYMENT METHOD
===================================================== */

const paymentRadios =
    document.querySelectorAll(
        'input[name="payment"]'
    );

const gcashDetails =
    document.getElementById("gcashDetails");

const paymayaDetails =
    document.getElementById("paymayaDetails");

const codDetails =
    document.getElementById("codDetails");


paymentRadios.forEach(radio => {

    radio.addEventListener(
        "change",
        function() {

            gcashDetails.classList.remove("active");
            paymayaDetails.classList.remove("active");
            codDetails.classList.remove("active");


            if (this.value === "gcash") {

                gcashDetails.classList.add("active");

            }


            if (this.value === "paymaya") {

                paymayaDetails.classList.add("active");

            }


            if (this.value === "cod") {

                codDetails.classList.add("active");

            }

        }
    );

});


/* =====================================================
   PLACE ORDER
===================================================== */

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const address =
            document.getElementById(
                "customerAddress"
            ).value.trim();


        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        if (!selectedPayment) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        /* ================= PAYMENT VALIDATION ================= */

        if (selectedPayment.value === "gcash") {

            const gcashNumber =
                document.getElementById(
                    "gcashNumber"
                ).value.trim();


            if (gcashNumber === "") {

                alert(
                    "Please enter your GCash number."
                );

                return;

            }

        }


        if (selectedPayment.value === "paymaya") {

            const paymayaNumber =
                document.getElementById(
                    "paymayaNumber"
                ).value.trim();


            if (paymayaNumber === "") {

                alert(
                    "Please enter your PayMaya number."
                );

                return;

            }

        }


        /* ================= PAYMENT NAME ================= */

        let paymentName = "";

        if (selectedPayment.value === "gcash") {

            paymentName = "GCash";

        }

        else if (
            selectedPayment.value === "paymaya"
        ) {

            paymentName = "PayMaya";

        }

        else {

            paymentName = "Cash on Delivery";

        }


        /* ================= TOTAL ================= */

        let total = 0;

        cart.forEach(item => {

            total +=
                item.price * item.quantity;

        });


        /* ================= SUCCESS ================= */

        successMessage.textContent =
            `Thank you, ${name}! Your order worth ${formatPrice(total)} will be processed using ${paymentName}.`;


        checkoutOverlay.classList.remove("active");

        successOverlay.classList.add("active");


        /* ================= CLEAR CART ================= */

        cart = [];

        updateCart();

        checkoutForm.reset();


        gcashDetails.classList.remove("active");
        paymayaDetails.classList.remove("active");
        codDetails.classList.remove("active");

    }
);


/* =====================================================
   SUCCESS
===================================================== */

continueShopping.addEventListener(
    "click",
    function() {

        successOverlay.classList.remove(
            "active"
        );

        showPage("shop");

    }
);


/* =====================================================
   NAVIGATION
===================================================== */

const navButtons =
    document.querySelectorAll(
        "[data-page]"
    );


function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(
            pageName + "Page"
        );


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    document.querySelectorAll(
        ".nav-link"
    ).forEach(button => {

        button.classList.remove("active");

        if (
            button.dataset.page === pageName
        ) {

            button.classList.add("active");

        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            showPage(
                this.dataset.page
            );

            document
                .getElementById(
                    "mobileNavigation"
                )
                .style.display = "none";

        }
    );

});


/* ================= HOME SHOP BUTTON ================= */

document
    .getElementById("homeShopButton")
    .addEventListener(
        "click",
        function() {

            showPage("shop");

        }
    );


/* ================= LOGO ================= */

document
    .getElementById("logoBtn")
    .addEventListener(
        "click",
        function() {

            showPage("home");

        }
    );


document
    .getElementById("footerLogo")
    .addEventListener(
        "click",
        function() {

            showPage("home");

        }
    );


/* =====================================================
   MOBILE MENU
===================================================== */

document
    .getElementById("menuButton")
    .addEventListener(
        "click",
        function() {

            const menu =
                document.getElementById(
                    "mobileNavigation"
                );


            if (
                menu.style.display === "block"
            ) {

                menu.style.display = "none";

            } else {

                menu.style.display = "block";

            }

        }
    );


/* =====================================================
   SEARCH
===================================================== */

const searchButton =
    document.getElementById(
        "searchButton"
    );

const searchBox =
    document.getElementById(
        "searchBox"
    );

const closeSearch =
    document.getElementById(
        "closeSearch"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const searchResults =
    document.getElementById(
        "searchResults"
    );


searchButton.addEventListener(
    "click",
    function() {

        searchBox.classList.add("active");

        searchInput.focus();

    }
);


closeSearch.addEventListener(
    "click",
    function() {

        searchBox.classList.remove(
            "active"
        );

        searchInput.value = "";

        searchResults.innerHTML = "";

    }
);


searchInput.addEventListener(
    "input",
    function() {

        const search =
            this.value
                .toLowerCase()
                .trim();


        searchResults.innerHTML = "";


        if (search === "") {

            return;

        }


        const results =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(search)
            );


        if (results.length === 0) {

            searchResults.innerHTML =
                "<p>No shoes found.</p>";

            return;

        }


        results.forEach(product => {

            searchResults.innerHTML += `
                <p style="padding:10px 0;">
                    <strong>
                        ${product.name}
                    </strong>
                    -
                    ${formatPrice(product.price)}
                </p>
            `;

        });

    }
);


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2000
    );

}


/* =====================================================
   START
===================================================== */

displayProducts();
updateCart();