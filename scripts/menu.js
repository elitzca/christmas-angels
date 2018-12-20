"use strict";
const burger = document.querySelector("#burger-menu");
const mediaQuery = window.matchMedia("(min-width:1025px)");
const burgerMenuItemsWrapper = document.querySelector(
  ".navigation-items-wrapper"
);
const cross = document.querySelector("#cross"); //crossDiv
const homeLink = document.querySelector("a#home-link"); //top-link
const aboutLink = document.querySelector("a#about-link"); //
const donLink = document.querySelector("a#don-link");
const partnersLink = document.querySelector("a#partners-link");
const logLink = document.querySelector("a#log-link");
const navLinksArray = [homeLink, aboutLink, donLink, partnersLink, logLink];

burger.addEventListener("click", openMenu);

function openMenu() {
  burgerMenuItemsWrapper.classList.remove("hideMenu");
  burgerMenuItemsWrapper.classList.add("showMenu");
}

cross.addEventListener("click", closeMenu);

function closeMenu() {
  burgerMenuItemsWrapper.classList.remove("showMenu");
  burgerMenuItemsWrapper.classList.add("hideMenu");
}

navLinksArray.forEach(link => {
  link.addEventListener("click", closeMenu);
});
