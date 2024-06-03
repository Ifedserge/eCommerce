import { createBlock, createImg, createButton } from './tags';
import { BlockType } from '../../components/types/enums';

export function productSlider(images: { url: string }[]): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['slider']);
  const sliderWrapper = createBlock(BlockType.div, ['slider__wrapper']);

  images.forEach((image) => {
    const slide = createBlock(BlockType.div, ['slider__slide']);
    const img = createImg(['slider__img'], image.url, 'Product image');
    slide.append(img);
    sliderWrapper.append(slide);
  });

  const prevButton = createButton(['slider__button', 'slider__button--prev'], '<');

  const nextButton = createButton(['slider__button', 'slider__button--next'], '>');

  let currentIndex = 0;

  const showSlide = (index: number) => {
    const slides = sliderWrapper.querySelectorAll('.slider__slide');
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
  };

  prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

  wrapper.append(prevButton, sliderWrapper, nextButton);
  showSlide(currentIndex);

  return wrapper;
}
