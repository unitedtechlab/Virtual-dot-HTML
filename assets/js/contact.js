document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactform");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = form.querySelectorAll("input, textarea");
  const formMessages = document.getElementById("form-messages");

  // Function to add or remove the 'filled' class and show/hide error messages
  function toggleFilledClass(event) {
    const input = event.target;
    const errorSpan = document.getElementById(`${input.name}-error`);

    if (input.value) {
      input.classList.add("filled");
      if (errorSpan) {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    } else {
      input.classList.remove("filled");
      if (errorSpan) {
        errorSpan.textContent = `Please fill in the ${input.name}.`;
        errorSpan.style.display = "block";
      }
    }
    // Check if all fields are filled
    checkAllFieldsFilled();
  }

  // Function to check if all fields are filled and add class to submit button
  function checkAllFieldsFilled() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value) {
        allFilled = false;
      }
    });
    if (allFilled) {
      submitBtn.classList.add("ready-to-submit");
    } else {
      submitBtn.classList.remove("ready-to-submit");
    }
  }

  // Attach the input event listener to each input and textarea
  inputs.forEach((input) => {
    input.addEventListener("input", toggleFilledClass);
  });

  submitBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    let allValid = true;

    // Validate each field and show error message if necessary
    if (!name) {
      const nameError = document.getElementById("name-error");
      if (nameError) {
        nameError.textContent = "Please fill in the name.";
        nameError.style.display = "block";
      }
      allValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      const emailError = document.getElementById("email-error");
      if (emailError) {
        emailError.textContent = "Please fill in the email.";
        emailError.style.display = "block";
      }
      allValid = false;
    } else if (!emailPattern.test(email)) {
      const emailError = document.getElementById("email-error");
      if (emailError) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
      }
      allValid = false;
    } else {
      const emailError = document.getElementById("email-error");
      if (emailError) {
        emailError.textContent = "";
        emailError.style.display = "none";
      }
    }

    if (!message) {
      const messageError = document.getElementById("message-error");
      if (messageError) {
        messageError.textContent = "Please fill in the message.";
        messageError.style.display = "block";
      }
      allValid = false;
    } else {
      const messageError = document.getElementById("message-error");
      if (messageError) {
        messageError.textContent = "";
        messageError.style.display = "none";
      }
    }

    if (!allValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        formMessages.textContent = "Message sent successfully!";
        formMessages.style.color = "green";
        // Hide the message after 5 seconds
        setTimeout(() => {
          formMessages.textContent = "";
        }, 5000);
      } else {
        formMessages.textContent = "Failed to submit form";
        formMessages.style.color = "red";
      }
      form.reset();
      // Reset the filled classes and submit button state
      inputs.forEach((input) => input.classList.remove("filled"));
      submitBtn.classList.remove("ready-to-submit");
    } catch (error) {
      console.error("Error:", error);
      formMessages.textContent =
        "Failed to send message. Please try again later.";
      formMessages.style.color = "red";
    }
  });
});
