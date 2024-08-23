// document.addEventListener("DOMContentLoaded", function () {
//   const sliderContainer = document.querySelector(".sliders");
//   const sliders = document.querySelectorAll(".slider");
//   const sliderCount = sliders.length;
//   let currentIndex = 0;
//   let autoSlideInterval;

//   // Clone first and last slider for infinite effect
//   const firstClone = sliders[0].cloneNode(true);
//   const lastClone = sliders[sliderCount - 1].cloneNode(true);

//   sliderContainer.appendChild(firstClone);
//   sliderContainer.insertBefore(lastClone, sliders[0]);

//   const updateSliderPosition = () => {
//     sliderContainer.style.transform = `translateX(-${
//       (currentIndex + 1) * (100 / 3)
//     }%)`;
//   };

//   const startAutoSlide = () => {
//     autoSlideInterval = setInterval(() => {
//       currentIndex++;
//       updateSliderPosition();

//       if (currentIndex >= sliderCount) {
//         setTimeout(() => {
//           sliderContainer.style.transition = "none";
//           currentIndex = 0;
//           updateSliderPosition();
//           setTimeout(() => {
//             sliderContainer.style.transition = "transform 0.3s ease-in-out";
//           }, 50);
//         }, 300);
//       }
//     }, 3000); // Adjust slide duration as needed
//   };

//   const stopAutoSlide = () => {
//     clearInterval(autoSlideInterval);
//   };

//   // Initialize slider position and start auto-slide
//   updateSliderPosition();
//   startAutoSlide();

//   // Pause on hover and resume on mouse leave
//   sliderContainer.addEventListener("mouseover", stopAutoSlide);
//   sliderContainer.addEventListener("mouseleave", startAutoSlide);
// });
