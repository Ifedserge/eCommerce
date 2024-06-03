import { createBlock, createImg, createButton, createSpan } from './tags';
import { BlockType } from '../../components/types/enums';

export function productSlider(images: { url: string }[]): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['slider']);
  const sliderWrapper = createBlock(BlockType.div, ['slider__wrapper']);
  const dotsWrapper = createBlock(BlockType.div, ['slider__dots']);

  let currentIndex = 0;

  const showSlide = (index: number) => {
    const slides = sliderWrapper.querySelectorAll('.slider__slide');
    const dots = dotsWrapper.querySelectorAll('.slider__dot');
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, idx) => {
      const slideElement = slide as HTMLElement;
      slideElement.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((dot, idx) => {
      const dotElement = dot as HTMLElement;
      dotElement.classList.toggle('active', idx === currentIndex);
    });
  };

  images.forEach((image, index) => {
    const slide = createBlock(BlockType.div, ['slider__slide']);
    const img = createImg(['slider__img'], image.url, 'Product image');
    slide.append(img);
    sliderWrapper.append(slide);

    const dot = createSpan(['slider__dot'], '');
    dot.addEventListener('click', () => showSlide(index));
    dotsWrapper.append(dot);
  });
  if (images.length > 1) {
    const prevButton = createButton(['slider__button', 'slider__button--prev'], '<');

    const nextButton = createButton(['slider__button', 'slider__button--next'], '>');

    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    wrapper.append(prevButton, sliderWrapper, nextButton, dotsWrapper);
    showSlide(currentIndex);
  } else {
    sliderWrapper.classList.add('single-image');
  }

  wrapper.append(sliderWrapper);

  return wrapper;
}
