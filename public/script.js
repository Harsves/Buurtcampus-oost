const hamburgerIcon = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburgerIcon.classList.remove("active");
    navMenu.classList.remove("active");
}))