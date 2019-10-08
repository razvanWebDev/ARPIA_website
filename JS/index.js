
window.onload = () => {
    // module.exports = {
    //     hello: () => {
    //         console.log("hello world");
    //     }
    // };
    

    console.log("okindex");
    // ==========================DOM ELEMENTS==========================================

    // HOME PAGE
    const slides = document.querySelectorAll(".slide");
    const next = document.querySelector("#next");
    const prev = document.querySelector("#prev");
    const autoSlide = true; //Set to true for auto slide
    const intervalTime = 5000; //slides interval for autoslide
    let slideInterval;
    // HOME PAGE
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

    const autoSlider = () => {
        if (autoSlide) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    };

    // HOME PAGE
    //home page slides
    next.addEventListener("click", () => {
        nextSlide();
        autoSlider();
    });
    prev.addEventListener("click", () => {
        prevSlide();
        autoSlider();
    });
    // autoslide
    if (autoSlide) {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
};
