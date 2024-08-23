let currentIndex = 0;
const slides = document.querySelectorAll('.slider');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

function updateSlides() {
    const slideWidth = slides[0].clientWidth;
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentIndex) * slideWidth}px)`;
    });

    // Update dot indicators
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (currentIndex >= totalSlides - 2) {
        if (currentIndex === totalSlides - 2) {
            dots[1].classList.add('active');
        } else {
            dots[2].classList.add('active');
        }
    } else {
        dots[0].classList.add('active');
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlides();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlides();
}

function autoSlide() {
    setInterval(nextSlide, 3000);
}

function switchTest(dot) {
    const dotIndex = parseInt(dot.getAttribute('data-attr'));
    currentIndex = dotIndex;
    updateSlides();
}

function touchStart(index) {
    return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    };
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) nextSlide();  // Swiping left
    if (movedBy > 100) prevSlide();   // Swiping right

    setPositionByIndex();

    prevTranslate = currentTranslate;
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${currentTranslate + (index - currentIndex) * slide.clientWidth}px)`;
    });
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -slides[0].clientWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

// Add event listeners for touch and mouse drag events
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img');
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    // Mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
});

// Initialize
updateSlides();
autoSlide();
