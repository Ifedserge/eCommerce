import { createBlock, createImg, createInput } from './tags';
import { BlockType, InputType } from '../../components/types/enums';

export function createModalSlider(images: { url: string }[]): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['modal-slider']);
  const sliderWrapper = createBlock(BlockType.div, ['modal-slider__wrapper']);
  const rangeInput = createInput(InputType.range, ['modal-slider__range']);

  rangeInput.min = '0';
  rangeInput.max = (images.length - 1).toString();
  rangeInput.value = '0';

  const showSlide = (index: number) => {
    const slides = sliderWrapper.querySelectorAll('.modal-slider__slide');
    slides.forEach((slide, idx) => {
      const slideElement = slide as HTMLElement;
      slideElement.classList.toggle('active', idx === index);
    });
  };

  images.forEach((image) => {
    const slide = createBlock(BlockType.div, ['modal-slider__slide']);
    const img = createImg(['modal-slider__img'], image.url, 'Product image');
    slide.append(img);
    sliderWrapper.append(slide);
  });

  rangeInput.addEventListener('input', () => {
    const index = parseInt(rangeInput.value, 10);
    showSlide(index);
  });

  wrapper.addEventListener('wheel', (event) => {
    const wheelEvent = event as WheelEvent; // Приведение типа события к WheelEvent
    wheelEvent.preventDefault();
    const index = parseInt(rangeInput.value, 10);
    if (wheelEvent.deltaY > 0 && index < images.length - 1) {
      rangeInput.value = (index + 1).toString();
    } else if (wheelEvent.deltaY < 0 && index > 0) {
      rangeInput.value = (index - 1).toString();
    }
    showSlide(parseInt(rangeInput.value, 10));
  });
  wrapper.append(sliderWrapper, rangeInput);

  return wrapper;
}
