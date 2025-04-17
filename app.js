const form = document.getElementById('contact-form');
const alertBox = document.getElementById('form-alert');
const captchaModal = document.getElementById('captcha-modal');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswer = document.getElementById('captcha-answer');
const verifyBtn = document.getElementById('verify-btn');
const cancelBtn = document.getElementById('cancel-btn');

let num1 = 0, num2 = 0;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Generate CAPTCHA
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
  captchaAnswer.value = '';
  captchaModal.style.display = 'flex';
});

verifyBtn.addEventListener('click', async () => {
  const userAnswer = parseInt(captchaAnswer.value);
  if (userAnswer === num1 + num2) {
    captchaModal.style.display = 'none';

    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

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
  } else {
    alert("Wrong answer! Please try again.");
  }
});

cancelBtn.addEventListener('click', () => {
  captchaModal.style.display = 'none';
});
