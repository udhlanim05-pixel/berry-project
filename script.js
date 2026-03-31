
// Side Menu Logic
let sidemenu = document.getElementById('sidemenu');

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// --- NEW ACCORDION LOGIC ---
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    // Close all other accordion items for a clean look
    document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
    });

    // If the clicked item wasn't active, open it
    if (!isActive) {
        item.classList.add('active');
    }
}


// Optional: Fix for hamburger button if you have one with ID 'hamburger'
let hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function () {
        if (sidemenu.style.right === "0px") {
            closemenu();
        } else {
            openmenu();
        }
    });
}

const form = document.getElementById("prod-contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("msg"); // Add <span id="msg"></span> to your HTML
  const data = new FormData(event.target);
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks! We'll get back to you shortly.";
      form.reset();
    } else {
      status.innerHTML = "Oops! There was a problem submitting your form.";
    }
  });
}
form.addEventListener("submit", handleSubmit);

// Target the form and the message span
const contactForm = document.getElementById("prod-contact-form");
const statusMsg = document.getElementById("msg");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // This stops the page from refreshing/redirecting

        // Create the data object to send
        const formData = new FormData(contactForm);

        // Update UI to show we are working on it
        statusMsg.innerHTML = "Sending...";
        statusMsg.style.color = "#3473c0";

        // Send the data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // SUCCESS: Update the message text
                statusMsg.innerHTML = "Message sent successfully!";
                statusMsg.style.color = "#61b752"; 
                contactForm.reset(); // Clear the boxes
            } else {
                // ERROR: Something went wrong with the server
                statusMsg.innerHTML = "Error sending message. Please try again.";
                statusMsg.style.color = "#ff4d4d";
            }
        })
        .catch(error => {
            // NETWORK ERROR: Internet is down or URL is wrong
            statusMsg.innerHTML = "Connection error. Check your internet.";
            statusMsg.style.color = "#ff4d4d";
        });
    });
}


