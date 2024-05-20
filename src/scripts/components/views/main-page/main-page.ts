import { createBlock } from '../../../services/utilities/tags';
import { BlockType } from '../../types/enums';

export class MainPage {
  // constructor() {}

  static createLayout(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['main-page']);
    return wrapper;
  }
}
