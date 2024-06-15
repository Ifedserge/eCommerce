import { checkLoginState } from '../../../../services/utilities/checkLoginState';
import { createBlock, createButton } from '../../../../services/utilities/tags';
import { BlockType, Pages } from '../../../types/enums';
import Router from '../../../../services/router/router';
import { basket, logo, userLogo } from '../../../../services/utilities/SVGs';

export class Header {
  private isLogined = checkLoginState();

  private router;

  private updateHeaderCallback;

  constructor(router: Router, callback: () => void) {
    this.router = router;
    this.updateHeaderCallback = callback;
  }

  createLayout(): HTMLElement {
    const block = createBlock(BlockType.header, ['header']);
    const wrapper = createBlock(BlockType.div, ['header__wrapper']);
    wrapper.append(this.createLogo(), this.createAboutPageButton(), this.createManageBlock());
    block.append(wrapper);
    return block;
  }

  createLogo(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['header__logo-wrapper']);
    const logoLink = createButton(['header__icon-wrapper'], '');
    logoLink.addEventListener('click', () => this.router.navigate(Pages.index));
    logoLink.innerHTML = logo;
    wrapper.append(logoLink);
    return wrapper;
  }

  createAuthBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['header__auth-wrapper']);

    const registerLink = createButton(['header__link', 'text', 'text_normal'], 'Register');
    registerLink.addEventListener('click', () => this.router.navigate(Pages.registration));

    const loginLink = createButton(['header__link', 'text', 'text_normal'], 'Log in');
    loginLink.addEventListener('click', () => this.router.navigate(Pages.login));

    const logoutLink = createButton(['header__link', 'text', 'text_normal'], 'Log out');
    logoutLink.addEventListener('click', () => {
      window.localStorage.clear();
      this.isLogined = false;
      this.updateHeaderCallback();
      this.router.navigate(Pages.index);
    });

    const userLink = createButton(['header__icon-wrapper'], '');
    userLink.addEventListener('click', () => this.router.navigate(Pages.user));
    userLink.innerHTML = userLogo;
    if (this.isLogined) wrapper.append(logoutLink, userLink);
    else wrapper.append(registerLink, loginLink);
    return wrapper;
  }

  createManageBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['header__manage-wrapper']);
    const basketLink = createButton(['header__icon-wrapper'], '');
    basketLink.addEventListener('click', () => this.router.navigate(Pages.basket));
    basketLink.innerHTML = basket;
    wrapper.append(this.createAuthBlock(), basketLink);
    return wrapper;
  }

  changeAuthState(): void {
    this.isLogined = !this.isLogined;
  }

  createAboutPageButton(): HTMLElement {
    const button = createButton(['header__about', 'text', 'text_normal'], 'About us');
    button.addEventListener('click', () => this.router.navigate(Pages.about));
    return button;
  }
}
