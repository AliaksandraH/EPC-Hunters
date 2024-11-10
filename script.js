"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal"),
        buttonBurger = document.querySelector(".burger"),
        crossButton = modal.querySelector(".cross");

    function toggleModal() {
        modal.classList.toggle("active");
    }

    buttonBurger.addEventListener("click", toggleModal);
    crossButton.addEventListener("click", toggleModal);

    modal.addEventListener("click", (event) => {
        event.target.classList.contains("modal") && toggleModal();
    });
});
