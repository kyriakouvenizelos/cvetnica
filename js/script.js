let cart = [];
let total = 0;

// Prevent default behavior for the contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Вашето съобщение е изпратено успешно!');
    this.reset(); // Reset the form after submission
});

// Cart icon click event
document.getElementById('cart-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    openCartModal(); // Open the cart modal
});

// Add item to the cart
function addToCart(name, price) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        // Increase quantity if the item exists
        existingItem.quantity += 1;
    } else {
        // Add the item to the cart with quantity set to 1
        cart.push({ name, price, quantity: 1 });
    }
    
    total += price;
    updateCartDisplay(); // Update the display of cart items
    openCartModal(); // Open the cart modal after adding the item
}

// Update cart display function
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');

    // Clear existing cart items
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Количката ви е празна.</p>';
        totalAmountSpan.textContent = '0'; // Reset total to 0

        // Close the cart modal if it's open
        if (modal.style.display === 'flex') {
            closeCartModal(); // Close the modal if cart is empty
        }
        return; // Exit the function here if cart is empty
    } else {
        // Display each item in the cart with quantity and a remove button
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - ${item.price} лв. (${item.quantity}) `;

            // Create remove button as a red "X"
            const removeButton = document.createElement('span');
            removeButton.textContent = '✖'; // Use a red "X"
            removeButton.classList.add('remove-button'); // Add class for styling
            removeButton.onclick = function() {
                removeFromCart(index); // Remove item when clicked
            };

            // Append the red "X" to the item div
            itemDiv.appendChild(removeButton);
            cartItemsDiv.appendChild(itemDiv);
        });
    }

    // Update total amount
    totalAmountSpan.textContent = total;
}

// Close modal when cart is empty and prevent issues on load
window.onload = function() {
    if (cart.length === 0 && modal.style.display === 'flex') {
        closeCartModal(); // Ensure modal is closed on load if cart is empty
    }
};




// Remove item from the cart
function removeFromCart(index) {
    const item = cart[index];

    if (item.quantity > 1) {
        // Decrease the quantity instead of removing the item
        item.quantity -= 1;
        total -= item.price; // Subtract the item price from the total
    } else {
        total -= item.price; // Subtract the item price from the total
        cart.splice(index, 1); // Remove item from the cart if quantity is 1
    }

    updateCartDisplay(); // Update the cart display
}

// Get modal elements
const modal = document.getElementById('cart-modal');
const closeModalButton = document.getElementById('close-modal');

// Function to open the modal
function openCartModal() {
    updateCartDisplay(); // Ensure cart is updated when opened
    modal.style.display = 'flex'; // Use flex to center the modal
}

// Function to close the modal
function closeCartModal() {
    modal.style.display = 'none'; // Hide modal
}

// Event listener for the close button
closeModalButton.addEventListener('click', closeCartModal);

// Close modal when clicking outside of the modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeCartModal();
    }
});

// Ensure modal is closed initially
window.onload = function() {
    closeCartModal();
};

// Checkout function
document.getElementById('checkout-btn').addEventListener('click', function(event) {
    // Check if the cart is empty
    if (cart.length === 0) {
        alert('Количката ви е празна!'); // Show alert for empty cart
        event.preventDefault(); // Prevent the checkout process
        return; // Stop further execution
    }

    // Check if a delivery date has been selected
    const deliveryDate = document.getElementById('delivery-date').value; 
    if (!deliveryDate) {
        alert('Моля, изберете дата за доставка!'); // Alert if date is not selected
        event.preventDefault(); // Prevent further execution
        return; // Stop further execution if no date is selected
    }

    // Proceed with checkout if cart is not empty and delivery date is selected
    cart = []; // Clear cart
    total = 0; // Reset total
    updateCartDisplay(); // Update the cart display
    closeCartModal(); // Close the cart modal
    openCheckout(); // Proceed to the checkout
});



// Open the checkout modal from the cart modal
function openCheckout() {
    // Hide the cart modal
    document.getElementById('cart-modal').style.display = 'none';
    // Show the checkout modal and start at step 1
    document.getElementById('checkout-modal').style.display = 'block';
    nextStep(1);
}

// Close the checkout modal and return to the cart
function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Close button functionality for the checkout modal
document.getElementById('close-checkout-modal').onclick = closeCheckout;

function nextStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('#checkout-steps .step');
    steps.forEach(s => s.style.display = 'none');
    
    // Show the requested step
    document.getElementById('step' + step).style.display = 'block';
}

function completePayment() {
    // Simulate payment processing (you can add payment validation here)
    nextStep(3); // Move to the confirmation step
    document.getElementById('delivery-name').value = '';
    document.getElementById('delivery-address').value = '';
    document.getElementById('delivery-phone').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry-date').value = '';
    document.getElementById('cvv').value = '';
}



const deliveryDateInput = document.getElementById('delivery-date');

deliveryDateInput.addEventListener('change', () => {
    const selectedDate = new Date(deliveryDateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    if (selectedDate < today) {
        alert('Моля, изберете валидна дата за доставка.'); // Alert for invalid date
        deliveryDateInput.value = ''; // Clear the input
    }
});

// Smooth scroll for links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Scroll to the targeted section smoothly
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Get the button
const backToTopButton = document.getElementById('backToTop');

// Show or hide the button based on scroll position
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block"; // Show the button
    } else {
        backToTopButton.style.display = "none"; // Hide the button
    }
};

// Smooth scroll to the top when the button is clicked
backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
});


let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const slideInterval = 5000; // Define the interval in a variable for easier modification

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
    currentSlide = index;
}

function changeSlide(direction) {
    let newSlide = currentSlide + direction;
    if (newSlide >= totalSlides) {
        newSlide = 0;
    } else if (newSlide < 0) {
        newSlide = totalSlides - 1;
    }
    showSlide(newSlide);
}

// Automatically change slides every 5 seconds
let slideTimer = setInterval(() => {
    changeSlide(1);
}, slideInterval);

// Initialize first slide
showSlide(currentSlide);

// Pause the slideshow when the user hovers over a slide
slides.forEach(slide => {
    slide.addEventListener('mouseover', () => {
        clearInterval(slideTimer);
    });
    slide.addEventListener('mouseout', () => {
        slideTimer = setInterval(() => {
            changeSlide(1);
        }, slideInterval);
    });
});

function openFlowerModal(name, imageAlt, price, description) {
    // Set flower details in the modal
    document.getElementById('flower-name').textContent = name;
    document.getElementById('flower-image').src = `pictures/${imageAlt}.jpg`; // Assuming images are named after the flower
    document.getElementById('flower-image').alt = imageAlt;
    document.getElementById('flower-price').textContent = `Цена: ${price}`;
    document.getElementById('flower-description').textContent = description;

    // Display the modal
    document.getElementById('flower-modal').style.display = 'block';
}

document.getElementById('close-flower-modal').onclick = function () {
    document.getElementById('flower-modal').style.display = 'none';
}

// Close the modal if clicked outside of the modal content
window.onclick = function(event) {
    if (event.target == document.getElementById('flower-modal')) {
        document.getElementById('flower-modal').style.display = 'none';
    }
}

// Function to open the flower modal and set the details
function openFlowerModal(name, description, price, imgSrc) {
    document.getElementById("flower-name").innerText = name;
    document.getElementById("flower-description").innerText = description;
    document.getElementById("flower-price").innerText = price;
    document.getElementById("flower-image").src = imgSrc;

    // Show the modal
    document.getElementById("flower-modal").style.display = "block";

    // Add the document-level click event listener after a small delay
    setTimeout(() => {
        document.addEventListener("click", closeModalOutsideClick);
    }, 0);
}

// Function to close the flower modal
function closeModal() {
    document.getElementById("flower-modal").style.display = "none";

    // Remove the document-level click event listener to prevent issues
    document.removeEventListener("click", closeModalOutsideClick);
}

// Close the flower modal when clicking outside the modal content
function closeModalOutsideClick(event) {
    const modalContent = document.querySelector("#flower-modal .modal-content");
    const modal = document.getElementById("flower-modal");

    // Check if the modal is open and the click is outside the modal content
    if (modal.style.display === "block" && !modalContent.contains(event.target)) {
        closeModal();
    }
}

// Close the flower modal when clicking the close button
document.getElementById("close-flower-modal").onclick = closeModal;
