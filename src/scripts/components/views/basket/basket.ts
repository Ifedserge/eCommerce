import { createBlock, createP } from '../../../services/utilities/tags';
import { BlockType } from '../../types/enums';

export class BasketPage {
  static render(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['basket']);
    const p = createP(['p'], 'CART CART CART');
    wrapper.append(p);
    return wrapper;
  }
}
