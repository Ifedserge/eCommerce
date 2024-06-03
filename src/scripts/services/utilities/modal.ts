import { createBlock, createImg } from './tags';
import { BlockType } from '../../components/types/enums';

export function createModal(imageUrl: string): HTMLElement {
  const overlay = createBlock(BlockType.div, ['modal-overlay']);
  const modal = createBlock(BlockType.div, ['modal_block']);

  const img = createImg(['modal__img'], imageUrl, 'Product image');

  modal.append(img);
  overlay.append(modal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });

  return overlay;
}
