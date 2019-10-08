window.onload = () => {
    // ==========================DOM ELEMENTS==========================================
    // GLOBAL
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const hamburger = document.querySelector("#hamburger");
    const nav = document.querySelector(".header-menu");
    const galleryLink = document.querySelector(".gallery-link");
    // HOME PAGE
    const slides = document.querySelectorAll(".slide");
    const next = document.querySelector("#next");
    const prev = document.querySelector("#prev");
    const autoSlide = true; //Set to true for auto slide
    const intervalTime = 5000; //slides interval for autoslide
    let slideInterval;
    // GALLERY PAGE
    const fotoAlbums = document.querySelector(".photo-albums-container");
    const fotoGallery = document.querySelector(".photo-gallery");

    // gallery modal
    const galleryModal = document.querySelector(".gallery-modal");
    const close = document.querySelector(".close");
    const curentPic = document.querySelector(".current-foto img");
    const currentPicLink = document.querySelector(".current-foto-link");
    const gallerySlider = document.querySelector(".gallery-slider");
    const slideLeft = document.querySelector(".slide-left");
    const slideRight = document.querySelector(".slide-right");

    // ============================RUN THE APP========================================

    // HEADER
    // Toggle navbar on mobile display
    const navToggle = () => {
        nav.classList.toggle("show-nav");
        hamburger.classList.toggle("toggle-burger");
    };

    // Close navbar on mobile display
    const navClose = e => {
        if (nav.classList.contains("show-nav")) {
            if (
                e.target != hamburger &&
                e.target != header &&
                e.target != galleryLink
            ) {
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
    const loadAlbums = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const albums = JSON.parse(xhttp.responseText);
                displayAlbums(albums);
            }
        };
        xhttp.open("GET", "JSON/albums-covers.json", true);
        xhttp.send();
    };

    const displayAlbums = albums => {
        //display foto gallery
        const galleryItems = albums.map(album => {
            const id = album.id;
            const albumName = album.albumName;
            const description = "" ? "" : album.description;
            const albumThumbnails = album.imgPath;
            const albumPictures = albumThumbnails.map(thumbnail => {
                return `<img src=${thumbnail} class=album-thumbnails>`;
            });
            return ` <a href="Galleries/foto-album${id}.html"
            <div class="foto-album">
                        <div class="album-description">
                            <h3>${albumName}</h3>
                            <p>${description}</p>
                        </div>
                        <div class="album-thumbnails-container">
                            ${albumPictures.join("")}
                           
                        </div>
                    </div>
                    </a>`;
        });
        fotoAlbums.innerHTML = galleryItems.join("");
    };

    const loadFotos = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const fotos = JSON.parse(xhttp.responseText);
                displayFotos(fotos);
            }
        };
        xhttp.open("GET", "../JSON/album2.json", true);
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
        gallerySlider.innerHTML = modalThumbnails.join("");
        //get current img for the modal
        currentImg();
        currentGalleryImg();
    };

    // Gallery modal
    // get gallery thumbs total width
    let sliderThumbsWidth = 0;
    const showGalleryModal = thumbs => {
        // get gallery thumbs total width
        thumbs.forEach(thumb => {
            sliderThumbsWidth += thumb.offsetWidth;
        });

        body.style.overflow = "hidden";
        galleryModal.classList.add("show");
        //close modal on "back" event
        history.pushState(null, null, location.href);
        window.onpopstate = function() {
            hideGalleryModal();
            history.go(1);
        };
        // hide slider left arrow if scroll == 0
        if (gallerySlider.scrollLeft <= 0) {
            slideLeft.style.display = "none";
        } else {
            slideLeft.style.display = "flex";
        }
        // hide slider right arrow is scroll ends
        if (
            sliderThumbsWidth -
                (gallerySlider.offsetWidth + gallerySlider.scrollLeft) <
            5
        ) {
            slideRight.style.display = "none";
        } else {
            slideRight.style.display = "flex";
        }
    };
    const hideGalleryModal = () => {
        body.style.overflow = "auto";
        // reset gallery thumbs total width
        sliderThumbsWidth = 0;
        galleryModal.classList.remove("show");
        //restore normal functionality for "back" event
        history.back();
    };

    // open gallery modal when gallery foto is clicked
    const currentGalleryImg = () => {
        const galleryPics = document.querySelectorAll(".photo-gallery-pic");
        const thumbs = document.querySelectorAll(".gallery-slider img");

        galleryPics.forEach(pic => {
            pic.addEventListener("click", () => {
                const imgPath = pic.getAttribute("data-path");
                // highlight and center current modal thumbnail
                getCurrentThumbnail(imgPath, thumbs);
                //set the selected foto as current img
                currentPicLink.setAttribute("href", imgPath);
                curentPic.src = imgPath;
                //open modal
                showGalleryModal(thumbs);
            });
        });
    };

    // get current thumbnail on modal open
    const getCurrentThumbnail = (imgPath, thumbs) => {
        thumbs.forEach(thumb => {
            thumb.classList.remove("current-slide-thumbnail");
        });
        const currentThumb = document.querySelector(
            `.gallery-slider img[src="${imgPath}"]`
        );
        currentThumb.classList.add("current-slide-thumbnail");
        currentThumb.scrollIntoView({ inline: "center" });
    };

    // select current foto from modal thumbnails
    const currentImg = () => {
        const thumbs = document.querySelectorAll(".gallery-slider img");
        thumbs.forEach(thumb => {
            thumb.addEventListener("click", () => {
                thumbs.forEach(thumb =>
                    thumb.classList.remove("current-slide-thumbnail")
                );
                // set modal current foto
                curentPic.src = thumb.src;
                currentPicLink.setAttribute("href", thumb.src);
                // modal current foto fade in
                curentPic.classList.add("fade-in");
                // remove fade in class after animation ends
                setTimeout(() => curentPic.classList.remove("fade-in"), 500);
                // current modal thumbnail
                thumb.classList.add("current-slide-thumbnail");
            });
        });
    };

    // move modal thumbails to right
    const moveSlideRight = () => {
        gallerySlider.scrollBy({
            top: 0,
            left: gallerySlider.offsetWidth / 2,
            behavior: "smooth"
        });

        if (
            sliderThumbsWidth -
                (gallerySlider.offsetWidth +
                    gallerySlider.scrollLeft +
                    gallerySlider.offsetWidth / 2) <
            5
        ) {
            slideRight.style.display = "none";
        }
        if (gallerySlider.scrollLeft + gallerySlider.offsetWidth / 2 <= 0) {
            slideLeft.style.display = "none";
        } else {
            slideLeft.style.display = "flex";
        }
    };

    const moveSlideLeft = () => {
        gallerySlider.scrollBy({
            top: 0,
            left: -gallerySlider.offsetWidth / 2,
            behavior: "smooth"
        });

        if (gallerySlider.scrollLeft - gallerySlider.offsetWidth / 2 <= 0) {
            slideLeft.style.display = "none";
        } else {
            slideLeft.style.display = "flex";
        }
        if (
            sliderThumbsWidth -
                (gallerySlider.offsetWidth + gallerySlider.scrollLeft) >
            0
        ) {
            slideRight.style.display = "flex";
        }
    };

    // ========================== EVENTS LISTENERS====================================

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
    if (window.location.pathname.includes("foto-album")) {
        // close gallery modal
        loadFotos();

        close.addEventListener("click", hideGalleryModal);
        slideRight.addEventListener("click", moveSlideRight);
        slideLeft.addEventListener("click", moveSlideLeft);
    }
    if (window.location.pathname.includes("gallery_foto.html")) {
        loadAlbums();
    }
};
