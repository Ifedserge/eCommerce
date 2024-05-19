import { createBlock } from '../../../services/utilities/tags';
import { BlockType } from '../../types/enums';
import Registration from '../registration/registration';
import { Login } from '../login/login';

export class MainPage {
  // constructor() {}

  static createLayout(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['main-page']);
    const regForm = Registration.render();
    const logForm = Login.render();
    wrapper.append(regForm, logForm);
    return wrapper;
  }
}
