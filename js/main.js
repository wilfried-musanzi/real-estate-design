import "../styles/main.scss";

const btnsClose = document.querySelectorAll(".close");
const links = document.querySelector(".nav__list");
const hide = document.querySelectorAll(".hide");

let form;
links.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("nav__link")) {
    const href = target.getAttribute("href");
    form = document.querySelector(href);
    form.classList.add("form__visible");
  }
});

btnsClose.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    form.classList.remove("form__visible");
  });
});

window.addEventListener("load", () => {
  hide.forEach((el) => {
    el.classList.remove("hide");
  });
});

const sections = document.querySelectorAll(".section");

const revealElement = function (entries, _) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
};

const elementObserver = new IntersectionObserver(revealElement, {
  root: null,
  threshold: 0.2,
});

sections.forEach(function (elemetn) {
  elementObserver.observe(elemetn);
  elemetn.classList.add("hidden");
});

// var prevScrollpos = window.pageYOffset;
// window.onscroll = function () {
//   // document.querySelector(".header").classList.add("fixed__nav");
//   // document.querySelector(".header").style.background = " rgb(1, 22, 39, 0.9)";

//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.querySelector(".header").classList.remove("header__hidden");

//     document.querySelector(".header").style.top = "0";
//     // document.querySelector(".header").style.background = "#000";
//   } else {
//     document.querySelector(".header").classList.add("header__hidden");
//     // document.querySelector(".header").style.background = "rgb(1, 22, 39)";
//   }
//   prevScrollpos = currentScrollPos;
// };

const mainNav = document.querySelector(".header");
const mainNavHeight = mainNav.getBoundingClientRect().height;
const observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) mainNav.classList.add("sticky");
    else mainNav.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${mainNavHeight}px`,
  }
);
observer.observe(document.querySelector(".hero"));
