const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("header ul");
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

const autoSlide = true; //Set to true for auto slide
const intervalTime = 5000; //slides interval for autoslide
let slideInterval;

// Toggle navbar on mobile display
const navToggle = () => {
    nav.classList.toggle("show-nav");
    hamburger.classList.toggle("toggle-burger");
};

// Home page slides
const nextSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add("current");
    } else {
        slides[0].classList.add("current");
    }
    current.classList.remove("current");
};

const prevSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add("current");
    } else {
        slides[slides.length - 1].classList.add("current");
    }
    current.classList.remove("current");
};

// Events listeners
const initEvents = () => {
    // show nav on hamburger tap
    hamburger.addEventListener("click", navToggle);

    //home page slides
    if (
        window.location.pathname == "/" ||
        window.location.pathname.slice(-10) == "index.html"
    ) {
        next.addEventListener("click", () => {
            nextSlide();
            if (autoSlide) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        });
        prev.addEventListener("click", () => {
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

// run
initEvents();
