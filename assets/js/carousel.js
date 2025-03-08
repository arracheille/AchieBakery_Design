let currentIndex = 0;
const visibleItems = 4;
const container = document.querySelector(".carousel-container");
const carousel = document.querySelector(".carousel");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function applySpaceBetween() {
  const containerWidth = container.clientWidth;
  const itemWidth = items[0].offsetWidth;

  // Menghitung gap berdasarkan ruang yang tersedia
  const totalGap = containerWidth - visibleItems * itemWidth;
  const gap = totalGap / (visibleItems - 1);

  // Mengatur margin antar item untuk efek space-between
  items.forEach((item, index) => {
    item.style.marginLeft = index > 0 ? `${gap}px` : "0";
  });

  // Menyesuaikan lebar carousel agar sesuai dengan item yang terlihat
  const totalWidth = itemWidth * totalItems + gap * (totalItems - 1);
  carousel.style.width = `${totalWidth}px`;

  updateCarousel();
}

function updateCarousel() {
  const itemWidth = items[0].offsetWidth;
  const containerWidth = container.clientWidth;
  const totalGap = containerWidth - visibleItems * itemWidth;
  const gap = totalGap / (visibleItems - 1);
  const moveDistance = (itemWidth + gap) * currentIndex * -1;

  carousel.style.transform = `translateX(${moveDistance}px)`;

  // Menyembunyikan item di luar jangkauan
  items.forEach((item, index) => {
    if (index >= currentIndex && index < currentIndex + visibleItems) {
      item.style.opacity = "1";
      item.style.pointerEvents = "auto";
    } else {
      item.style.opacity = "0";
      item.style.pointerEvents = "none";
    }
  });

  // Menonaktifkan tombol jika di awal atau akhir
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex + visibleItems >= totalItems;
}

// Navigasi Next
nextBtn.addEventListener("click", () => {
  if (currentIndex + visibleItems < totalItems) {
    currentIndex++;
    updateCarousel();
  }
});

// Navigasi Prev
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

window.onload = applySpaceBetween;
window.onresize = applySpaceBetween;
