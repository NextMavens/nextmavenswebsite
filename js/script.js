//
// NAV MENU SCRIPT START
//

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.querySelector(".side-menu");
  const overlay = document.querySelector(".side-menu-overlay");
  const navMenu = document.querySelector(".nav-menu");
  let lastScroll = 0;
  let scrollTimer = null;

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    sideMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  function closeMenu() {
    hamburger.classList.remove("active");
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !sideMenu.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

    if (currentScroll > 50) {
      navMenu.classList.add("scrolled");
      navMenu.classList.add("floating");

      scrollTimer = setTimeout(() => {
        navMenu.classList.remove("floating");
      }, 150);
    } else {
      navMenu.classList.remove("scrolled", "floating");
    }

    lastScroll = currentScroll;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
});

//
// NAV MENU SCRIPT END
//
window.addEventListener("scroll", reveal);

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

//
// SUB HERO SCRIPT START
//

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "none";
        entry.target.offsetHeight;
        entry.target.style.animation = null;
      }
    });
  },
  {
    threshold: 0.1,
  }
);

observer.observe(document.querySelector(".sub-hero"));

const subHero = document.querySelector(".sub-hero");
const floatingX = document.querySelector(".floating-x");

subHero.addEventListener("mousemove", (e) => {
  const rect = subHero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xOffset = (x - rect.width / 2) / 50;
  const yOffset = (y - rect.height / 2) / 50;

  floatingX.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
});

subHero.addEventListener("mouseleave", () => {
  floatingX.style.transform = "translate(0, 0)";
});

//
// SUB HERO SCRIPT END
//

//
// OUR EXPERTIES SECTION START
//

const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercentage = (scrollTop / documentHeight) * 100;
  progressBar.style.width = scrollPercentage + "%";
});

document.querySelectorAll(".learn-more-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const card = e.target.closest(".card");
    card.style.transform = "rotateY(180deg)";
    setTimeout(() => {
      card.style.transform = "rotateY(0deg)";
    }, 1000);
  });
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

//
// OUR EXPERTIES SECTION END
//
// Object to store all slideshow data
const slideshows = {};

// Function to initialize all slideshows on the page
function initializeSlideshows() {
  document.querySelectorAll(".slideshow-container").forEach((container) => {
    const id = container.id;
    const slides = container.querySelectorAll(".slide");
    const indicatorsContainer = container.querySelector(".slide-indicators");
    const prevButton = container.querySelector(".prev");
    const nextButton = container.querySelector(".next");

    slideshows[id] = {
      currentSlide: 0,
      slides: slides,
      indicators: [],
      interval: null,
    };

    // Create indicators
    slides.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = `indicator ${index === 0 ? "active" : ""}`;
      indicator.addEventListener("click", () => goToSlide(index, id));
      indicatorsContainer.appendChild(indicator);
      slideshows[id].indicators.push(indicator);
    });

    // Add event listeners to controls
    prevButton.addEventListener("click", () => changeSlide(-1, id));
    nextButton.addEventListener("click", () => changeSlide(1, id));

    // Start automatic slideshow
    startAutoSlideshow(id);
  });
}

// Function to start or restart the automatic slideshow
function startAutoSlideshow(slideshowId) {
  const slideshow = slideshows[slideshowId];

  // Clear existing interval if any
  if (slideshow.interval) {
    clearInterval(slideshow.interval);
  }

  // Start new interval
  slideshow.interval = setInterval(() => {
    changeSlide(1, slideshowId);
  }, 5000);
}

// Function to change slides
function changeSlide(direction, slideshowId) {
  const slideshow = slideshows[slideshowId];
  const { slides, indicators, currentSlide } = slideshow;

  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active");
  indicators[currentSlide].classList.remove("active");

  // Calculate new slide index
  slideshow.currentSlide =
    (currentSlide + direction + slides.length) % slides.length;

  // Add active class to new slide and indicator
  slides[slideshow.currentSlide].classList.add("active");
  indicators[slideshow.currentSlide].classList.add("active");

  // Restart the auto-slideshow timer
  startAutoSlideshow(slideshowId);
}

// Function to go to a specific slide
function goToSlide(index, slideshowId) {
  const slideshow = slideshows[slideshowId];
  const { slides, indicators, currentSlide } = slideshow;

  // If trying to go to the current slide, do nothing
  if (index === currentSlide) return;

  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active");
  indicators[currentSlide].classList.remove("active");

  // Update current slide
  slideshow.currentSlide = index;

  // Add active class to new slide and indicator
  slides[index].classList.add("active");
  indicators[index].classList.add("active");

  // Restart the auto-slideshow timer
  startAutoSlideshow(slideshowId);
}

// Initialize slideshows when the page loads
window.addEventListener("load", initializeSlideshows);

//
//
//
//
function moveCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const items = carousel.querySelectorAll(".carousel-item");
  if (items.length === 0) return;

  const itemWidth = items[0].offsetWidth;
  let currentPosition = parseInt(
    carousel.style.transform.replace("translateX(", "").replace("px)", "") ||
      "0"
  );
  let newPosition = currentPosition + direction * itemWidth;
  const maxPosition = -(items.length - 5) * itemWidth;

  if (newPosition > 0) {
    newPosition = maxPosition;
  } else if (newPosition < maxPosition) {
    newPosition = 0;
  }

  carousel.style.transform = `translateX(${newPosition}px)`;
  resetProgressBar(carouselId);
}

function resetProgressBar(carouselId) {
  const progressBar = document.getElementById(carouselId + "-progress");
  if (!progressBar) return;

  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 50);
}

function autoSlide() {
  moveCarousel("logo-carousel", 1);
  moveCarousel("review-carousel", 1);
}

function initializeCarousels() {
  // Start auto-sliding
  setInterval(autoSlide, 5000);

  // Initialize progress bars
  resetProgressBar("logo");
  resetProgressBar("review");
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", initializeCarousels);
