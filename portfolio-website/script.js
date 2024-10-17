// Smooth scrolling between sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Contact form validation
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    if (name && email && message) {
      alert("Thank you for your message, " + name + "!");
      // Clear the form
      document.getElementById('contact-form').reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
  