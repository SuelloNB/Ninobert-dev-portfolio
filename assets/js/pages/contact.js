export function initContactForm() {
    const form = document.getElementById("mainContactForm");
    const button = form.querySelector(".send-btn");
  
    if (!form) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
  
      //Validation
      if (!name || !email || !message) {
        alert("Please fill all required fields.");
        return;
      }
  
      // UI Feedback
      button.textContent = "Sending...";
      button.disabled = true;
  
      emailjs.sendForm(
        "service_9r3g54f",
        "template_4ntfhz6",
        form
      )
      .then(() => {
        button.textContent = "Message Sent";
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        button.textContent = "Failed";
      })
      .finally(() => {
        setTimeout(() => {
          button.textContent = "Send Now";
          button.disabled = false;
        }, 3000);
      });
    });
  }