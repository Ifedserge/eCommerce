import { createBlock, createButton, createHeading } from '../../../services/utilities/tags';
import { BlockType, HeadingType, Pages } from '../../types/enums';
import { Router } from '../../types/interfaces';

export function createNotFoundPage(router: Router): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['not-found']);
  const code = createHeading(['not-found__code', 'text'], '404', HeadingType.h1);
  const message = createHeading(
    ['not-found__message', 'text'],
    'Sorry, but page not found',
    HeadingType.h2,
  );
  const linkToMain = createButton(['not-found__link', 'text', 'text_small'], 'Go to the main page');
  linkToMain.addEventListener('click', () => router.navigate(Pages.index));

  wrapper.append(code, message, linkToMain);
  return wrapper;
}
