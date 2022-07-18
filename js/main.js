import "../styles/main.scss";

const btnsClose = document.querySelectorAll(".close");
const links = document.querySelector(".nav__list");
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
