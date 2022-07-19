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
  threshold: 0.15,
});

sections.forEach(function (elemetn) {
  elementObserver.observe(elemetn);
  elemetn.classList.add("hidden");
});

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
const nav = document.querySelector(".contact");
nav.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);
  const href = e.target.getAttribute("href");
  if (href) document.querySelector(href).scrollIntoView({ behavior: "smooth" });
});
