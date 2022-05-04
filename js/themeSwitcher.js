"use strict";

//Antonina teki koko homman itsenäisesti
let themeSwitcher = document.getElementById("themeSwitcher");
let theme =
  localStorage.getItem("theme") != null
    ? localStorage.getItem("theme")
    : themeSwitcher.dataset.target;
changeTheme();
themeSwitcher.onclick = () => {
  if (theme == "day") {
    theme = "night";
    themeSwitcher.dataset.target = theme;
    localStorage.setItem("theme", theme);
  } else {
    theme = "day";
    localStorage.setItem("theme", theme);
    themeSwitcher.dataset.target = theme;
  }
  changeTheme();
};

function changeTheme() {
  if (theme == "night") {
    themeSwitcher.innerHTML = `<i class="fas fa-sun"></i>`;
    themeSwitcher.style.background = "#35424C";
    document.body.classList = "dark";
    body.style.background = "#1B252C";
    document.querySelector(".hero-title").style.color = "#FFFFFF";
    document.querySelector(".logo").style.color = "#9DAFBD";
    document.querySelector(".hero-input-wrapper").style.background = "#35424C";
    document.querySelector(".hero-input").style.border = "1px solid #47545E";
    document.querySelector(".hero-input").style.background = "#35424C";
    document.querySelector(".hero-input").style.color = "#9DAFBD";
    body.color = "#e5e5e5";
  } else {
    themeSwitcher.innerHTML = `<i class="fas fa-moon"></i>`;
    themeSwitcher.style.background = "#e5e5e5";
    body.style.background = "#ffffff";
    document.body.classList = "";

    document.querySelector(".hero-title").style.color = "";
    document.querySelector(".logo").style.color = "";
    document.querySelector(".hero-input-wrapper").style.background = "";
    document.querySelector(".hero-input").style.border = "";
    document.querySelector(".hero-input").style.background = "";
    document.querySelector(".hero-input").style.color = "";
  }
}
