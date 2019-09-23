const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const autoSlide = true; //Set to true for auto slide
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add("current");
    } else {
        slides[0].classList.add("current");
    }
    setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add("current");
    } else {
        slides[slides.length - 1].classList.add("current");
    }
    setTimeout(() => current.classList.remove("current"));
};

const initEvents = () => {
    if (window.location.pathname == "/") {
        next.addEventListener("click", e => {
            nextSlide();
            if (autoSlide) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        });
        prev.addEventListener("click", e => {
            prevSlide();
            if (autoSlide) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        });
        // autoslide
        if (autoSlide) {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }
};

initEvents();
