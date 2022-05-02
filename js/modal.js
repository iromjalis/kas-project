"use strict";

const galleryListRef = document.querySelector(".js-gallery");
const modalImgRef = document.querySelector(".lightbox__image");
const modalRef = document.querySelector(".lightbox");
const buttonRef = document.querySelector(".lightbox__button");
const mapRef = document.querySelector("#map");

const onOpenModalClick = (e) => {
  e.preventDefault();
  const markup = e.target;
  // console.log("markup: ", markup.textContent);

  modalImgRef.innerHTML = markup.textContent;

  modalRef.classList = `lightbox` + `is-open`;
};

const onKeyboardClick = (e) => {
  if (e.key === "Escape") {
    modalRef.classList = `lightbox`;
  }
};

const onCloseModalClick = (e) => {
  modalRef.classList = `lightbox`;
};

galleryListRef.addEventListener("click", onOpenModalClick);
//close by Escape
window.addEventListener("keyup", onKeyboardClick);
//close by click X
buttonRef.addEventListener("click", onCloseModalClick);
