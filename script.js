const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const bookingForm = document.querySelector(".booking-form");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("name") || "Devotee";
  const seva = formData.get("seva") || "your selected seva";

  bookingForm.reset();
  bookingForm.querySelector(".form-note").textContent =
    `Thank you, ${name}. Sri Mayam has received your enquiry for ${seva}.`;
});
