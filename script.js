const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

const imageSources = Array.from(galleryItems).map((img) => img.src);
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImage.src = imageSources[currentIndex];
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext() {
  currentIndex = (currentIndex + 1) % imageSources.length;
  lightboxImage.src = imageSources[currentIndex];
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + imageSources.length) % imageSources.length;
  lightboxImage.src = imageSources[currentIndex];
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

closeButton.addEventListener("click", closeLightbox);
nextButton.addEventListener("click", showNext);
prevButton.addEventListener("click", showPrev);

// Close when clicking the dark overlay
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});