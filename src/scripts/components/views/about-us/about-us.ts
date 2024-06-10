import { createBlock } from '../../../services/utilities/tags';
import { BlockType } from '../../types/enums';

export class AboutUsPage {
  static render(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['about-us']);
    return wrapper;
  }
}
