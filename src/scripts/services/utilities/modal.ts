import { createBlock } from './tags';
import { BlockType } from '../../components/types/enums';
import { createModalSlider } from './modalSlider';

export function createModal(images: { url: string }[], currentIndex: number): HTMLElement {
  const overlay = createBlock(BlockType.div, ['modal-overlay']);
  const modal = createBlock(BlockType.div, ['modal_block']);

  const slider = createModalSlider(images);
  const slides = slider.querySelectorAll('.modal-slider__slide');
  const rangeInput = slider.querySelector('.modal-slider__range') as HTMLInputElement;

  if (slides[currentIndex]) {
    slides[currentIndex].classList.add('active');
    rangeInput.value = currentIndex.toString();
  }

  modal.append(slider);
  overlay.append(modal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });

  return overlay;
}
