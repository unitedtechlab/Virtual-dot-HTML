document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactform");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        try {
            const response = await fetch("http://localhost:9090/contactus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                // toaster("Message sent successfully!");
            } else {
                alert("Failed to submit form");
                // toaster("Failed to submit form");
            }
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message. Please try again later.");
        }
    });
});
