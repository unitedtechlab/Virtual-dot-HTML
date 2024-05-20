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
const subMenu = document.querySelector(".submenu-wrapper");
const hasSubmenu = document.querySelector("li.hasSubmenu > a");
 
arrowButton.forEach((el) =>
  el.addEventListener("click", (event) => {
    subMenu.classList.toggle("open");
    hasSubmenu.classList.toggle("open");
  })
);
 
document.onclick = function (e) {
  if (!subMenu.contains(e.target) && !hasSubmenu.contains(e.target)) {
    subMenu.classList.remove("open");
    hasSubmenu.classList.remove("open");
  }
};
 