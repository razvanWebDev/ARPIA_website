const header = document.querySelector("header");
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector(".header-links");
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

const autoSlide = true; //Set to true for auto slide
const intervalTime = 5000; //slides interval for autoslide
let slideInterval;

const fotoGallery = document.querySelector(".photo-gallery");

// Toggle navbar on mobile display
const navToggle = () => {
    nav.classList.toggle("show-nav");
    hamburger.classList.toggle("toggle-burger");
};

// Close navbar on mobile display
const navClose = e => {
    if (nav.classList.contains("show-nav")) {
        if (e.target != hamburger && e.target != header) {
            navToggle();
        }
    }
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

// GALLERY PAGE
const loadFotos = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const fotos = JSON.parse(xhttp.responseText);
            displayFotos(fotos);
        }
    };
    xhttp.open("GET", "gallery.json", true);
    xhttp.send();
};

const displayFotos = fotos => {
    const galleryItems = fotos.map(function(foto) {
        const imgPath = foto.imgPath;
        return `<div class="photo-gallery-item">
                    <a href="${imgPath}">
                        <div class=" photo-gallery-pic" style="background-image: url(${imgPath})"></div>
                    </a>
                </div>`;
    });
    fotoGallery.innerHTML = galleryItems.join("");
};

// Events listeners
const initEvents = () => {
    // show nav on hamburger tap
    hamburger.addEventListener("click", navToggle);
    //hide nav on tap
    window.addEventListener("click", navClose);

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
loadFotos();
