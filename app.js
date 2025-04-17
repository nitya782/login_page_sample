const form = document.getElementById('contact-form');
const alertBox = document.getElementById('form-alert');
const captchaModal = document.getElementById('captcha-modal');
const captchaSubmitBtn = document.getElementById('captcha-submit-btn');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Show CAPTCHA modal
  captchaModal.style.display = 'flex';
});

captchaSubmitBtn.addEventListener('click', async () => {
  const response = grecaptcha.getResponse();

  if (response.length === 0) {
    alert('Please complete the reCAPTCHA to proceed.');
  } else {
    captchaModal.style.display = 'none';

    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const apiResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await apiResponse.json();

    if (result.success) {
      alertBox.textContent = "✅ Thank you! Your message has been sent.";
      alertBox.className = "alert success";
      alertBox.style.display = 'block';
      form.reset();
    } else {
      alertBox.textContent = "❌ Failed to send. Please try again.";
      alertBox.className = "alert error";
      alertBox.style.display = 'block';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 5000);
  }
});
