const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const ghostButtons = document.querySelectorAll('[data-scroll="#gallery"]');
ghostButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector("#gallery");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    form.classList.add("form-success");
    setTimeout(() => form.classList.remove("form-success"), 2000);
  });
}

// Theme toggle removed - dark mode only

const animatedItems = document.querySelectorAll("[data-animate]");
if (animatedItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedItems.forEach((el) => observer.observe(el));
}

const loadMoreBtn = document.getElementById("load-more-videos");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const hiddenVideos = document.querySelectorAll(".video-hidden");
    console.log("Gizli video sayısı:", hiddenVideos.length);
    hiddenVideos.forEach((video) => {
      video.style.display = "block";
      video.classList.remove("video-hidden");
    });
    const wrapper = loadMoreBtn.parentElement;
    if (wrapper) wrapper.style.display = "none";
  });
}

const shortsContainer = document.getElementById("shorts-container");
const shortsPrevBtn = document.getElementById("shorts-prev");
const shortsNextBtn = document.getElementById("shorts-next");

if (shortsContainer && shortsPrevBtn && shortsNextBtn) {
  let currentPage = 0;
  const totalShorts = shortsContainer.querySelectorAll("article").length;

  function getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 640) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  }

  function updateSlide() {
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(totalShorts / itemsPerPage);
    const wrapper = shortsContainer.parentElement;
    const wrapperWidth = wrapper.offsetWidth - 2;
    const gapSize = window.innerWidth <= 640 ? 16 : 20;
    const slideWidth = wrapperWidth + gapSize;
    const translatePx = currentPage * slideWidth;
    shortsContainer.style.transform = `translateX(-${translatePx}px)`;
    
    shortsPrevBtn.disabled = currentPage === 0;
    shortsNextBtn.disabled = currentPage >= totalPages - 1;
    
    // Sayfa sınırını kontrol et
    if (currentPage >= totalPages) {
      currentPage = totalPages - 1;
      shortsContainer.style.transform = `translateX(-${currentPage * slideWidth}px)`;
    }
  }

  shortsPrevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateSlide();
    }
  });

  shortsNextBtn.addEventListener("click", () => {
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(totalShorts / itemsPerPage);
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateSlide();
    }
  });

  updateSlide();
  window.addEventListener('resize', updateSlide);
}

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (mobileMenuToggle && siteNav) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    siteNav.classList.toggle("active");
  });

  // Menü linklerine tıklayınca menüyü kapat
  const navLinks = siteNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      siteNav.classList.remove("active");
    });
  });

  // Dışarıya tıklayınca menüyü kapat
  document.addEventListener("click", (e) => {
    if (!siteNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove("active");
      siteNav.classList.remove("active");
    }
  });
}

