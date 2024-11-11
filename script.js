"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal"),
        buttonBurger = document.querySelector(".burger"),
        crossButton = modal.querySelector(".cross"),
        prev = document.querySelector(".slider-button-prev"),
        next = document.querySelector(".slider-button-next");
    let slideIndex = 0,
        blocks,
        lines;

    const topBlock = [297, 533, 630, 400, 328, 484];
    const leftBlock = [70, 89, 497, 425, 909, 770];

    const topLine = [372, 588, 480, 334, 417];
    const leftLine = [75, 306, 601, 635, 1028];

    const stylesLine = [
        "height: 205px;",
        "height: 195px; transform: rotate(-15deg);",
        "height: 178px; transform: rotate(-15deg);",
        "height: 108px;",
        "height: 151px; transform: rotate(-18deg);",
    ];

    function toggleModal() {
        modal.classList.toggle("active");
    }

    function createBlocks(index) {
        const block = document.createElement("div");
        block.classList.add("block", "flex-row-center-around");
        block.innerHTML = `
            <img src="./assets/vector.png" alt="Vector" class="vector" />
            <div class="ellipse flex-column-center-center">
                <span class="text-ellipse">${index + 1}</span>
            </div>
            <span class="text-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        `;
        document.querySelector(".blocks").append(block);
    }

    function createLine(index) {
        const line = document.createElement("img");
        line.classList.add("line");
        line.src = `./assets/line-${index + 1}.svg`;
        line.alt = "Line";
        line.style.cssText = stylesLine[index];
        document.querySelector(".blocks").append(line);
    }

    function showBlocks() {
        for (let i = 0; i < 6; i++) {
            createBlocks(i, topBlock[i], leftBlock[i]);
        }
        for (let i = 0; i < 5; i++) {
            createLine(i);
        }
        blocks = document.querySelectorAll(".block");
        lines = document.querySelectorAll(".line");
        updateLayout();
    }

    function updateLayout() {
        blocks.forEach((item) => {
            item.style.display = "none";
        });

        if (window.innerWidth >= 1279) {
            blocks.forEach((item, index) => {
                item.style.position = "absolute";
                setBlockPosition(item, index, topBlock, leftBlock);
                item.style.display = "";
            });
            lines.forEach((item, index) => {
                setBlockPosition(item, index, topLine, leftLine);
            });
        } else {
            showSlides();
        }
    }

    function setBlockPosition(block, index, arrTop, arrLeft) {
        const newLeft = (window.innerWidth - 1280) / 2;
        const newTop = (window.innerHeight - 832) / 2;
        block.style.top = `${arrTop[index] + newTop}px`;
        block.style.left = `${arrLeft[index] + newLeft}px`;
    }

    function showSlides(num = 0) {
        blocks.forEach((item) => {
            item.style.display = "none";
        });
        slideIndex += num;
        if (slideIndex > 5) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = 5;
        }
        blocks[slideIndex].style.display = "";
        blocks[slideIndex].style.top = "auto";
        blocks[slideIndex].style.left = "auto";
        blocks[slideIndex].style.position = "relative";
    }

    window.addEventListener("resize", updateLayout);

    modal.addEventListener("click", (event) => {
        event.target.classList.contains("modal") && toggleModal();
    });

    buttonBurger.addEventListener("click", toggleModal);
    crossButton.addEventListener("click", toggleModal);

    prev.addEventListener("click", () => {
        showSlides(-1);
    });
    next.addEventListener("click", () => {
        showSlides(1);
    });

    showBlocks();
});
