// DOM ELEMENTS
const header = document.querySelector("header");
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector(".header-links");
// Home page
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const autoSlide = true; //Set to true for auto slide
const intervalTime = 5000; //slides interval for autoslide
let slideInterval;
// Gallery page
const fotoGallery = document.querySelector(".photo-gallery");
const galleryModal = document.querySelector(".gallery-modal");
const close = document.querySelector(".close");
const curentPic = document.querySelector(".current-foto img");
const galeryThumbnails = document.querySelector(".gallery-thumbnails");
const gallerySlider = document.querySelector(".gallery-slider");
const slideLeft = document.querySelector(".slide-left");
const slideRight = document.querySelector(".slide-right");

// RUNNING THE APP
// HEADER
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
    //display foto gallery
    const galleryItems = fotos.map(foto => {
        const imgPath = foto.imgPath;
        return `<div class="photo-gallery-item">
        <div class=" photo-gallery-pic" style="background-image: url(${imgPath})" data-path="${imgPath}"></div>
                </div>`;
    });
    fotoGallery.innerHTML = galleryItems.join("");

    //display gallery-modal thumbnails
    const modalThumbnails = fotos.map(foto => {
        const imgPath = foto.imgPath;
        return `<img src="${imgPath}" class="modal-slider-pic">`;
    });
    galeryThumbnails.innerHTML = modalThumbnails.join("");
    currentImg();
    openGalleryModal();
};

// Gallery modal
// open gallery modal when gallery foto is clicked
const openGalleryModal = () => {
    const galleryPics = document.querySelectorAll(".photo-gallery-pic");
    galleryPics.forEach(pic => {
        pic.addEventListener("click", () => {
            const imgPath = pic.getAttribute("data-path");
            curentPic.src = imgPath;
            showGalleryModal();
        });
    });
};

const showGalleryModal = () => galleryModal.classList.add("show");
const hideGalleryModal = () => galleryModal.classList.remove("show");

// select current foto from modal thumbnails
const currentImg = () => {
    const thumbs = document.querySelectorAll(".gallery-thumbnails img");
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => (curentPic.src = thumb.src));
    });
};
// move modal thumbails to right
let currentSlidePos = 0;
slideRight.addEventListener("click", () => {
    const modalSliderPic = document.querySelectorAll(".modal-slider-pic");
    const modalSliderPicWidth =
        galeryThumbnails.offsetWidth - modalSliderPic.length * 130;

    currentSlidePos -= 130;
    if (modalSliderPicWidth >= currentSlidePos) {
        currentSlidePos = modalSliderPicWidth;
    }
    galeryThumbnails.style.transform = `translateX(${currentSlidePos}px)`;
});
slideLeft.addEventListener("click", () => {
    currentSlidePos += 130;
    if (currentSlidePos >= 0) {
        currentSlidePos = 0;
    }
    galeryThumbnails.style.transform = `translateX(${currentSlidePos}px)`;
});

//  EVENTS LISTENERS
// show nav on hamburger tap
hamburger.addEventListener("click", navToggle);
//hide nav on tap
window.addEventListener("click", navClose);

// HOME PAGE
//home page slides
if (
    window.location.pathname == "/" ||
    window.location.pathname.includes("index.html")
) {
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
}

// GALLERY PAGE
// close gallery modal
if (window.location.pathname.includes("gallery.html")) {
    loadFotos();
    close.addEventListener("click", hideGalleryModal);
}
