import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, currentCounter, wrapper, field}) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  current.textContent = getZero(slideIndex);
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i === 0) {
      dot.classList.add('dot__active');
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset == parseFloat(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseFloat(width);
    }

    slidesField.style.transform = `translate(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.textContent = getZero(slideIndex);

    dots.forEach(dot => dot.classList.remove('dot__active'));
    dots[slideIndex - 1].classList.add('dot__active');
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = parseFloat(width) * (slides.length - 1);

    } else {
      offset -= parseFloat(width);
    }

    slidesField.style.transform = `translate(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.textContent = getZero(slideIndex);

    dots.forEach(dot => dot.classList.remove('dot__active'));
    dots[slideIndex - 1].classList.add('dot__active');
  });

  dots.forEach(dot => {
    dot.addEventListener('click', event => {
      const slideTo = event.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = parseFloat(width) * (slideTo - 1);
      slidesField.style.transform = `translate(-${offset}px)`;

      current.textContent = getZero(slideIndex);

      dots.forEach(dot => dot.classList.remove('dot__active'));
      dots[slideIndex - 1].classList.add('dot__active');
    });
  });
}

export default slider;