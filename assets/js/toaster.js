function toaster(message) {
    var toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;

    document.body.appendChild(toast);

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");

        toast.addEventListener("remove transition", function () {
            document.body.removeChild(toast);
        });
    }, 3000);
}
console.log(toaster("Message sent successfully!"));