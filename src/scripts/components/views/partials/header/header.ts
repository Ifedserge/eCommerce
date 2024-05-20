import { createBlock, createLink } from '../../../../services/utilities/tags';
import { BlockType } from '../../../types/enums';

export class Header {
  private isLogined: boolean;

  constructor(logined = false) {
    this.isLogined = logined;
  }

  createLayout(): HTMLElement {
    const wrapper = createBlock(BlockType.header, ['header']);
    wrapper.append(this.createLogo(), this.createManageBlock());
    return wrapper;
  }

  createLogo(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['header__logo-wrapper']);
    const logo = `<svg width="73" height="19" viewBox="0 0 73 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.392 18H10.016L5.696 10.152L4.688 7.992H4.64L4.736 11.136V18H0.464V2.16H5.816L10.136 10.008L11.168 12.168H11.192L11.096 9.024V2.16H15.392V18ZM22.8834 18H18.0354V6H22.8834V18ZM21.9474 4.752L20.4594 2.856L18.9714 4.752H15.5874L18.1554 0.527999H22.7634L25.3314 4.752H21.9474ZM41.4787 5.76C42.6787 5.76 43.6307 6.12 44.3347 6.84C45.0387 7.56 45.3907 8.576 45.3907 9.888V18H40.5427V11.088C40.5427 10.48 40.4387 10.048 40.2307 9.792C40.0387 9.52 39.7427 9.384 39.3427 9.384C38.8307 9.384 38.4307 9.576 38.1427 9.96C37.8707 10.344 37.7347 10.912 37.7347 11.664V18H32.8867V11.088C32.8867 10.48 32.7827 10.048 32.5747 9.792C32.3827 9.52 32.0867 9.384 31.6867 9.384C31.1907 9.384 30.7987 9.576 30.5107 9.96C30.2227 10.344 30.0787 10.92 30.0787 11.688V18H25.2307V6H29.5987L29.7187 8.472C30.0867 7.592 30.6147 6.92 31.3027 6.456C32.0067 5.992 32.8467 5.76 33.8227 5.76C34.7347 5.76 35.5027 5.968 36.1267 6.384C36.7667 6.8 37.2227 7.4 37.4947 8.184C37.8627 7.4 38.3907 6.8 39.0787 6.384C39.7667 5.968 40.5667 5.76 41.4787 5.76ZM59.8753 11.712C59.8753 12.288 59.8353 12.752 59.7552 13.104H51.8593C51.9553 13.776 52.1713 14.248 52.5073 14.52C52.8433 14.792 53.3153 14.928 53.9233 14.928C54.8993 14.928 55.4993 14.544 55.7233 13.776L59.6353 14.904C59.3313 15.992 58.6673 16.824 57.6433 17.4C56.6353 17.96 55.3953 18.24 53.9233 18.24C51.7473 18.24 50.0833 17.704 48.9313 16.632C47.7793 15.544 47.2033 14 47.2033 12C47.2033 10.016 47.7633 8.48 48.8833 7.392C50.0193 6.304 51.6113 5.76 53.6593 5.76C55.6593 5.76 57.1953 6.296 58.2673 7.368C59.3393 8.424 59.8753 9.872 59.8753 11.712ZM53.6833 9.048C53.1553 9.048 52.7393 9.2 52.4353 9.504C52.1473 9.808 51.9553 10.304 51.8593 10.992H55.3393C55.2593 10.336 55.0833 9.848 54.8113 9.528C54.5553 9.208 54.1793 9.048 53.6833 9.048ZM66.9794 18.24C65.5554 18.24 64.3394 18.088 63.3314 17.784C62.3394 17.48 61.5154 16.984 60.8594 16.296L63.1394 13.656C63.5554 14.152 64.0674 14.536 64.6754 14.808C65.2834 15.064 65.9554 15.192 66.6914 15.192C67.1074 15.192 67.4434 15.144 67.6994 15.048C67.9554 14.952 68.0834 14.808 68.0834 14.616C68.0834 14.44 67.9394 14.288 67.6514 14.16C67.3634 14.016 66.8514 13.864 66.1154 13.704C64.3554 13.368 63.0834 12.888 62.2994 12.264C61.5314 11.64 61.1474 10.832 61.1474 9.84C61.1474 9.152 61.3714 8.496 61.8194 7.872C62.2834 7.248 62.9714 6.744 63.8834 6.36C64.8114 5.96 65.9554 5.76 67.3154 5.76C69.9234 5.76 71.8034 6.424 72.9554 7.752L70.7714 10.128C70.0194 9.248 68.9314 8.808 67.5074 8.808C67.0114 8.808 66.6354 8.872 66.3794 9C66.1234 9.112 65.9954 9.264 65.9954 9.456C65.9954 9.616 66.1314 9.76 66.4034 9.888C66.6914 10 67.1634 10.112 67.8194 10.224C69.6274 10.496 70.9314 10.944 71.7314 11.568C72.5474 12.176 72.9554 13.024 72.9554 14.112C72.9554 15.312 72.4514 16.304 71.4434 17.088C70.4354 17.856 68.9474 18.24 66.9794 18.24Z" fill="#151C22"/>
    </svg>
    `;
    const logoLink = createLink(['header__icon-wrapper'], '', ''); // add the link
    logoLink.innerHTML = logo;
    wrapper.append(logoLink);
    return wrapper;
  }

  createAuthBlock(): HTMLElement {
    // this.changeAuthState(); //emulator of authorized/unauthorized user for view. Delete later

    const wrapper = createBlock(BlockType.div, ['header__auth-wrapper']);
    const registerLink = createLink(['header__link', 'text', 'text_normal'], '', 'Register'); // add the link
    const loginLink = createLink(['header__link', 'text', 'text_normal'], '', 'Log in'); // add the link
    const logoutLink = createLink(['header__link', 'text', 'text_normal'], '', 'Log out'); // add the link
    const userLink = createLink(['header__icon-wrapper'], '', ''); // add the link
    const userLogo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
    userLink.innerHTML = userLogo;
    if (this.isLogined) wrapper.append(logoutLink, userLink);
    else wrapper.append(registerLink, loginLink);
    return wrapper;
  }

  createManageBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['header__manage-wrapper']);
    const basket = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H4.63636L7.07273 12.4771C7.15586 12.8718 7.38355 13.2263 7.71595 13.4785C8.04835 13.7308 8.46427 13.8649 8.89091 13.8571H17.7273C18.1539 13.8649 18.5698 13.7308 18.9022 13.4785C19.2346 13.2263 19.4623 12.8718 19.5455 12.4771L21 5.28571H5.54545M9.18182 18.1429C9.18182 18.6162 8.7748 19 8.27273 19C7.77065 19 7.36364 18.6162 7.36364 18.1429C7.36364 17.6695 7.77065 17.2857 8.27273 17.2857C8.7748 17.2857 9.18182 17.6695 9.18182 18.1429ZM19.1818 18.1429C19.1818 18.6162 18.7748 19 18.2727 19C17.7707 19 17.3636 18.6162 17.3636 18.1429C17.3636 17.6695 17.7707 17.2857 18.2727 17.2857C18.7748 17.2857 19.1818 17.6695 19.1818 18.1429Z" stroke="#151C22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    const basketLink = createLink(['header__icon-wrapper'], '', ''); // add the link
    basketLink.innerHTML = basket;
    wrapper.append(this.createAuthBlock(), basketLink);
    return wrapper;
  }

  changeAuthState(): void {
    this.isLogined = !this.isLogined;
  }
}
