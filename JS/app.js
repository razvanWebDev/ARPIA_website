// TODOS
// Add meta tags and SEO
// finish and review privacy policy page (see red text)
// credit card
// redirect to https
// forms validation & back end

window.onload = () => {
  // get current page name to help xhttp requests in loadFotos()
  const currentPath = window.location.pathname;
  const currentPageName = currentPath
    .split("/")
    .pop()
    .split(".")
    .shift();
  // ==========================DOM ELEMENTS==========================================
  // GLOBAL
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const pageHeader = document.querySelector(".page-header");
  const hamburger = document.querySelector("#hamburger");
  const nav = document.querySelector(".header-menu");
  const headerBlank = document.querySelector(".header-blank");
  const galleryPageTitle = document.querySelector(".gallery-page-title");
  const upArrow = document.querySelector(".to-top-arrow");
  // HOME PAGE
  const slides = document.querySelectorAll(".slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const autoSlide = true; //Set to true for auto slide
  const intervalTime = 6000; //slides interval for autoslide
  let slideInterval;
  const scrollDown = document.querySelector("#scrollDown");
  // EVENTS PAGE
  const eventsContainer = document.querySelector(".events-container");
  // GALLERY PAGE
  const fotoAlbumsMain = document.querySelector(".photo-albums-main");
  const fotoGalleryMain = document.querySelector(".photo-gallery-main");
  const fotoGallery = document.querySelector(".photo-gallery");
  const fotoAlbums = document.querySelector(".photo-albums-container");
  const videoAlbums = document.querySelector(".video-albums-container");
  const galleryDescription = document.querySelector(".gallery-description");

  // gallery modal
  const modal = document.querySelector(".modal");
  const fotoGalleryModal = document.querySelector("#foto-gallery-modal");
  const videoGalleryModal = document.querySelector("#video-gallery-modal");

  const currentPic = document.querySelector(".current-foto img");
  const currentVideo = document.querySelector(".current-video");
  const currentPicLink = document.querySelector(".current-foto-link");
  const gallerySlider = document.querySelector(".gallery-slider");
  const slideLeft = document.querySelector("#slide-left");
  const slideRight = document.querySelector("#slide-right");

  // CONTACTPAGE
  const donationMethods = document.querySelectorAll(".donation-methods div");
  const methodDivs = document.querySelectorAll(".methods_div");
  const donationAmount = document.querySelectorAll(".donation-amount");

  // ============================RUN THE APP========================================
  // GLOBAL
  // Disable back event and use it for another action
  const disableBackEvent = action => {
    history.replaceState(null, document.title, location.pathname + "#!/dummy");
    history.pushState(null, document.title, location.pathname);

    window.addEventListener(
      "popstate",
      () => {
        if (location.hash === "#!/dummy") {
          setTimeout(function() {
            history.replaceState(null, document.title, location.pathname);
          }, 0);
          action();
        }
      },
      false
    );
  };

  // Showw scroll up arrow
  const showItem = (item, scrollHeight) => {
    const y = window.scrollY;
    if (y >= scrollHeight) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  };

  const showScrollDown = (item, scrollHeight) => {
    const y = window.scrollY;
    if (y < scrollHeight) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  };
  // scroll page to top
  const scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });

  // Check if item exists
  const ifItemExists = item => {
    if (item == undefined || item == null) {
      item = "";
    }
    return item;
  };

  // HEADER
  // transparent header on scroll
  const transparentHeader = () => {
    const y = window.scrollY;
    if (y >= 130) {
      pageHeader.classList.add("index-header");
      nav.classList.remove("menu-border");
    } else {
      pageHeader.classList.remove("index-header");
      nav.classList.add("menu-border");
    }
  };
  // Toggle navbar on mobile display
  const navToggle = () => {
    nav.classList.toggle("show-nav");
    if (nav.classList.contains("show-nav")) {
      nav.style.animation = `navSlideIn 0.7s forwards`;
    } else {
      nav.style.animation = `navSlideOut 0.7s`;
    }
    hamburger.classList.toggle("toggle-burger");
  };

  // AJAX REQUESTS ======================================================

  // Load foto albums & video gallery
  const loadGalleryItems = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const albums = JSON.parse(xhttp.responseText);
        const videos = JSON.parse(xhttp.responseText);
        const arpiaEvents = JSON.parse(xhttp.responseText);
        if (window.location.pathname.includes("gallery_foto.html")) {
          displayAlbums(albums);
        }
        if (window.location.pathname.includes("gallery_video.html")) {
          displayVideos(videos);
        }
        if (window.location.pathname.includes("events.html")) {
          displayEvents(arpiaEvents);
        }
      }
    };
    xhttp.open("GET", `JSON/${currentPageName}.json`, true);
    xhttp.send();
  };

  //Load fotos for each album
  const loadFotos = path => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const fotos = JSON.parse(xhttp.responseText);
        showAlbumGallery();
        displayFotos(fotos);
      }
    };
    xhttp.open("GET", `${path}`, true);
    xhttp.send();
  };

  // HOME PAGE =========================================================================
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

  const scrollPage = () =>
    window.scroll({
      top: window.innerHeight,
      behavior: "smooth"
    });

  //===========================EVENTS PAGE==============================================================
  const displayEvents = arpiaEvents => {
    const events = arpiaEvents.map(event => {
      return `<div class="event">
                        <div class="event-description">
                            <h3>${ifItemExists(event.eventName)}<br>
                            ${ifItemExists(event.eventDate)}</h3>
                            <p>${ifItemExists(event.eventDescription)}</p>
                        </div>
                        <img src="${ifItemExists(
                          event.eventPosterSmall
                        )}" class="event-poster">
                    </div>
                    <div class="separator"></div>`;
    });
    eventsContainer.innerHTML = events.join("");
    showEventsModal();
  };

  const showEventsModal = () => {
    const eventPics = document.querySelectorAll(".event-poster");
    eventPics.forEach(pic =>
      pic.addEventListener("click", function() {
        currentPicSrc = this.src.replace("_small", "");
        currentPicLink.href = currentPicSrc;
        currentPic.src = currentPicSrc;
        showGalleryModal();
      })
    );
  };

  // VIDEO GALLERY PAGE ==================================================================================
  // Display video gallery items
  const displayVideos = videos => {
    const galleryItems = videos.map(video => {
      return `<div class="video-gallery-item">
                <div class="gallery-pic" style="background-image: url(${
                  video.videoThumbLink
                })" >
                  <div class="playVideo" data-path="${
                    video.videoSrc
                  }?${ifItemExists(video.startTime)}&${ifItemExists(
        video.stopTime
      )}&autoplay=1">
                      <img src="./img/playBtn.png" alt="play">
                  </div>
                </div>
                        <p class="video-title">${ifItemExists(
                          video.videoTitle
                        )}</p>
                        <p class="video-description">${ifItemExists(
                          video.videoDescription
                        )}</p>
                    
              </div>`;
    });
    videoAlbums.innerHTML = galleryItems.join("");
    playCurrentVideo();
  };
  // Open modal and play current video
  const playCurrentVideo = () => {
    const playVideoBtns = document.querySelectorAll(".playVideo");
    playVideoBtns.forEach(button =>
      button.addEventListener("click", function() {
        currentVideo.src = this.getAttribute("data-path");
        showVideoModal();
      })
    );
  };

  const showVideoModal = () => {
    videoGalleryModal.classList.add("show");
    body.style.overflow = "hidden";
    // TODO disable back event
    // disableBackEvent(hideVideoModal);
  };

  const hideVideoModal = () => {
    videoGalleryModal.classList.remove("show");
    body.style.overflow = "auto";
    currentVideo.setAttribute("src", "");
  };

  // FOTO GALLERY PAGE ====================================================================
  //Display foto albums
  const displayAlbums = albums => {
    //display foto albums
    const galleryItems = albums.map(album => {
      const albumPictures = album.imgPath.map(thumbnail => {
        return `<img src=${thumbnail} class=album-thumbnails>`;
      });
      return ` <div class="foto-album" data-path="${album.albumPath}">
                         <div class="album-description">
                            <p>${ifItemExists(album.albumName)}</p>
                            <p>- ${ifItemExists(album.albumDate)} -</p> 
                        </div>
                        <div class="album-thumbnails-container">
                            ${albumPictures.join("")}
                        </div>
                    </div>`;
    });
    fotoAlbums.innerHTML = galleryItems.join("");

    const galleryAlbums = document.querySelectorAll(".foto-album");
    galleryAlbums.forEach(album =>
      album.addEventListener("click", function() {
        const galeryPath = album.getAttribute("data-path");
        loadFotos(galeryPath);
      })
    );
  };

  // TODO Animation ???
  const showAlbumGallery = () => {
    window.scrollTo(0, 0);
    fotoGalleryMain.style.display = "block";
    fotoAlbumsMain.style.display = "none";
    disableBackEvent(hideAlbumGAllery);
  };

  const hideAlbumGAllery = () => {
    fotoGalleryMain.style.display = "none";
    fotoAlbumsMain.style.display = "block";
  };

  // Display current album gallery
  const displayFotos = fotos => {
    // get gallery title & date
    galleryPageTitle.innerHTML = `${ifItemExists(
      fotos[0].albumName
    )} <br> ${ifItemExists(fotos[0].date)}`;
    //get gallery description
    galleryDescription.innerHTML = ifItemExists(fotos[0].description);

    //display foto gallery
    const galleryFotos = fotos.filter(
      foto => foto.imgPath != undefined || foto.imgPath != ""
    );
    const galleryItems = galleryFotos.map(foto => {
      return `<div class="photo-gallery-item">
                        <div class="gallery-pic" style="background-image: url(${foto.imgPath})" data-path="${foto.imgPath}"></div>
                    </div>`;
    });
    fotoGallery.innerHTML = galleryItems.join("");

    //display gallery-modal thumbnails
    const modalThumbnails = fotos.map(foto => {
      return `<img src="${foto.imgPath}" data-path="${foto.imgPath}" class="modal-slider-pic modal-child">`;
    });
    gallerySlider.innerHTML = modalThumbnails.join("");
    //get current img for the modal
    currentGalleryImg();
  };

  // Gallery modal
  // show foto gallery modal
  const showGalleryModal = () => {
    body.style.overflow = "hidden";
    modal.classList.add("show");

    // close modal on "back" event
    // window.addEventListener(
    //     "popstate",
    //     function() {
    //         hideGalleryModal();
    //     },
    //     false
    // );
    disableBackEvent(hideGalleryModal);

    // get current photo
    currentImg();
  };

  const hideGalleryModal = event => {
    if (!event.target.classList.contains("modal-child")) {
      body.style.overflow = "auto";
      modal.classList.remove("show");
    }
  };

  // select current foto on modal thumbnails click
  const currentImg = () => {
    const thumbs = document.querySelectorAll(".gallery-slider img");
    thumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        thumbs.forEach(thumb =>
          thumb.classList.remove("current-slide-thumbnail")
        );
        // set modal current foto
        const currentPicSrc = thumb.getAttribute("data-path");
        currentPic.src = currentPicSrc;
        currentPicLink.href = currentPicSrc;
        // modal current foto fade in
        currentPic.classList.add("fade-in");
        // remove fade in class after animation ends
        setTimeout(() => currentPic.classList.remove("fade-in"), 500);
        // current modal thumbnail
        thumb.classList.add("current-slide-thumbnail");
      });
    });
  };

  // open gallery modal when gallery foto is clicked
  const currentGalleryImg = () => {
    const galleryPics = document.querySelectorAll(".gallery-pic");
    const thumbs = document.querySelectorAll(".gallery-slider img");

    galleryPics.forEach(pic => {
      pic.addEventListener("click", () => {
        const imgPath = pic.getAttribute("data-path");

        //set the selected foto as current img
        currentPicLink.href = imgPath;
        currentPic.src = imgPath;
        //open modal
        showGalleryModal();
        // highlight and center current modal thumbnail
        getCurrentThumbnail(imgPath, thumbs);
        showHideArrows();
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

  // show hide gallery slider arrows
  function showHideArrows() {
    const thumbs = document.querySelectorAll(".gallery-slider img");
    // hide slider left arrow if scroll == 0
    if (gallerySlider.scrollLeft <= 0) {
      slideLeft.style.display = "none";
    } else {
      slideLeft.style.display = "flex";
    }

    // hide slider right arrow is scroll ends
    //get thumbs width + margins
    let thumbsWidth = 0;
    thumbs.forEach(thumb => (thumbsWidth += thumb.offsetWidth + 6));
    if (
      thumbsWidth - gallerySlider.offsetWidth - gallerySlider.scrollLeft <
      10
    ) {
      slideRight.style.display = "none";
    } else {
      slideRight.style.display = "flex";
    }
  }

  // move modal thumbails to right
  const moveSlideRight = () => {
    gallerySlider.scrollBy({
      top: 0,
      left: gallerySlider.offsetWidth / 4,
      behavior: "smooth"
    });
  };

  const moveSlideLeft = () => {
    gallerySlider.scrollBy({
      top: 0,
      left: -gallerySlider.offsetWidth / 4,
      behavior: "smooth"
    });
  };

  // ================CONTACT PAGE ===================================
  donationMethods.forEach(method => {
    method.addEventListener("click", function() {
      methodDivs.forEach(div => (div.style.display = "none"));
      donationMethods.forEach(method =>
        method.classList.remove("current-method")
      );
      this.classList.add("current-method");
      const methodName = this.getAttribute("data-link");
      document.querySelector(`.${methodName}`).style.display = "block";
    });
  });

  donationAmount.forEach(amount =>
    amount.addEventListener("click", function() {
      donationAmount.forEach(item => item.classList.remove("current-method"));
      this.classList.add("current-method");
    })
  );

  // ========================== EVENTS LISTENERS====================================

  // show nav on hamburger tap
  hamburger.addEventListener("click", navToggle);
  //hide nav on tap
  headerBlank.addEventListener("click", navToggle);
  //scroll page to top
  window.addEventListener("scroll", () => showItem(upArrow, 300));
  // scroll page to top
  upArrow.addEventListener("click", scrollToTop);

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
    scrollDown.addEventListener("click", scrollPage);
    window.addEventListener("scroll", () => showScrollDown(scrollDown, 50));
    window.onload = showScrollDown(scrollDown, 50);
  }

  if (!window.location.pathname.includes("index.html")) {
    // toggle transparent header
    window.addEventListener("scroll", transparentHeader);
    window.onload = transparentHeader();
  }

  // GALLERY PAGE
  if (window.location.pathname.includes("gallery_foto.html")) {
    gallerySlider.addEventListener("scroll", showHideArrows);
    slideRight.addEventListener("click", moveSlideRight);
    slideLeft.addEventListener("click", moveSlideLeft);
  }
  if (window.location.pathname.includes("gallery_video")) {
    videoGalleryModal.addEventListener("click", hideVideoModal);
  }
  // CONTACT PAGE
  if (window.location.pathname.includes("contact.html")) {
    scrollDown.addEventListener("click", scrollPage);
    window.addEventListener("scroll", () => showScrollDown(scrollDown, 50));
    window.onload = showScrollDown(scrollDown, 50);
  }
  // COMMON
  if (
    window.location.pathname.includes("gallery_foto.html") ||
    window.location.pathname.includes("gallery_video.html") ||
    window.location.pathname.includes("events.html")
  ) {
    loadGalleryItems();
  }
  if (
    window.location.pathname.includes("gallery_foto.html") ||
    window.location.pathname.includes("events.html")
  ) {
    modal.addEventListener("click", hideGalleryModal);
  }
};
