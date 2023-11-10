document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    let currentIndex = 0;
    let startPosX = 0;
    let endPosX = 0;

    const showSlide = () => {
      const offset = -currentIndex * 120; // Ширина блока + отступ
      slider.style.transform = `translateX(${offset}px)`;
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide();
    };

    const handleGestureStart = (e) => {
      startPosX = e.pageX || e.touches[0].pageX;
    };

    const handleGestureMove = (e) => {
      endPosX = e.pageX || e.touches[0].pageX;
    };

    const handleGestureEnd = () => {
      if (endPosX - startPosX > 50) {
        prevSlide();
      } else if (startPosX - endPosX > 50) {
        nextSlide();
      }
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });

    const prevBtn = document.querySelector(".prevBtn");
    const nextBtn = document.querySelector(".nextBtn");

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    slider.addEventListener("mousedown", handleGestureStart);
    slider.addEventListener("touchstart", handleGestureStart);
    slider.addEventListener("mousemove", handleGestureMove);
    slider.addEventListener("touchmove", handleGestureMove);
    slider.addEventListener("mouseup", handleGestureEnd);
    slider.addEventListener("touchend", handleGestureEnd);

    setInterval(nextSlide, 2000); // Автоматическое переключение каждые 2 секунды (по желанию)
  });
});
