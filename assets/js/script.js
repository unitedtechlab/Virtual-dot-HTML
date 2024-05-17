// mobile header nav menu js
const hamburger = document.querySelector("#navbtn");
const navLink = document.querySelector("#navbar");

hamburger.addEventListener("click", () => {
  navLink.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// sticky header js
window.onscroll = function () {
  myFunction();
};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// slider js
const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 1,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  speed: 1500,
  rewind: true,
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// animation js
AOS.init({
  duration: 1000,
  offset: 150,
  disable: "mobile",
});

// submenu js
const arrowButton = document.querySelectorAll("li.hasSubmenu");

arrowButton.forEach((el) =>
  el.addEventListener("click", (event) => {
    const subMenu =
      event.target.parentElement.querySelector(".submenu-wrapper");
    subMenu.classList.toggle("open");

    const hasSubmenu =
      event.target.parentElement.querySelector("li.hasSubmenu > a");
    hasSubmenu.classList.toggle("open");
  })
);


