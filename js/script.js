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
