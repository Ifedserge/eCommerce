import { createBlock } from '../../../services/utilities/tags';
import { BlockType } from '../../types/enums';

export class BasketPage {
  static render(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['basket']);
    return wrapper;
  }
}
