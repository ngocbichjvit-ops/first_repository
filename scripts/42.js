(function () {
  'use strict';

  function initCustomSlider() {
    const slider = document.getElementById('custom-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');

    let currentIndex = 0;
    let autoSlideInterval = null;

    function showSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      slides.forEach((slide) => slide.classList.remove('active'));
      dots.forEach((dot) => dot.classList.remove('active'));

      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
      });
    });

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
      }
    }

    document.addEventListener('keydown', (e) => {
      if (!slider.matches(':hover')) return;
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
      }
    });

    showSlide(0);
    startAutoSlide();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomSlider);
  } else {
    initCustomSlider();
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('rocket-allScriptsLoaded', initCustomSlider);
  }
})();
