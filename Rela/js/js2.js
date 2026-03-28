const form = document.getElementById("bookingForm");
const messageBox = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");
const bookingCard = document.querySelector(".booking-card");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const checkin = formData.get("checkin");
  const checkout = formData.get("checkout");

  if (new Date(checkout) <= new Date(checkin)) {
    showMessage("⚠️ Check-out date must be after check-in date.", "error", true);
    return;
  }

  const confirmBooking = confirm(
    `Confirm your booking:\n\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n` +
    `Check-in: ${checkin}\nCheck-out: ${checkout}\n` +
    `Guests: ${formData.get("guests")}\nPackage: ${formData.get("package")}`
  );
  if (!confirmBooking) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Booking...";

  fetch("/process-booking", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) {
      showMessage("✅ Your booking has been successfully submitted!", "success", false, true);
      form.reset();
    } else {
      throw new Error("Server error");
    }
  })
  .catch(error => {
    showMessage("❌ There was a problem submitting your booking. Please try again.", "error", true);
    console.error(error);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Book Now";
  });
});

function showMessage(text, type, shake = false, glow = false) {
  messageBox.textContent = text;
  messageBox.className = "message " + type;
  messageBox.style.display = "block";

  // Reset fade
  messageBox.classList.remove("fade-out");

  // Shake effect
  if (shake) {
    bookingCard.classList.add("shake");
    setTimeout(() => bookingCard.classList.remove("shake"), 600);
  }

  // Glow effect
  if (glow) {
    bookingCard.classList.add("glow");
    setTimeout(() => bookingCard.classList.remove("glow"), 1600);
  }

  // Fade out after 4s
  setTimeout(() => {
    messageBox.classList.add("fade-out");
  }, 4000);

  // Hide completely after 5s
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 5000);
}

/* contact.js */
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  alert(`Thank you, ${name}! Your message has been received.`);
  e.target.reset();
});
