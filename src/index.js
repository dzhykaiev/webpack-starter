import "./scss/main.scss";

document.addEventListener("DOMContentLoaded", function(event) {
  const btn = document.querySelector(".hamburger");
  const content = document.querySelector(".navbar");

  btn.addEventListener("click", function() {
    btn.classList.toggle("open");
    content.classList.toggle("active");
  });
});
