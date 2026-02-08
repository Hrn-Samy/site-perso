const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const burger = document.querySelector(".burger");
const menu = document.querySelector("[data-menu]");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}
