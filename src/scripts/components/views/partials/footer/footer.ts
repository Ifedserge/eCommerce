import { createBlock, createLink } from '../../../../services/utilities/tags';
import { BlockType } from '../../../types/enums';

export function createFooter(): HTMLElement {
  const footer = createBlock(BlockType.footer, ['footer']);
  const wrapper = createBlock(BlockType.footer, ['footer__wrapper']);
  const logoWrapper = createBlock(BlockType.div, ['footer__logo-wrapper']);
  const logo = `<svg width="73" height="19" viewBox="0 0 73 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.392 18H10.016L5.696 10.152L4.688 7.992H4.64L4.736 11.136V18H0.464V2.16H5.816L10.136 10.008L11.168 12.168H11.192L11.096 9.024V2.16H15.392V18ZM22.8834 18H18.0354V6H22.8834V18ZM21.9474 4.752L20.4594 2.856L18.9714 4.752H15.5874L18.1554 0.527999H22.7634L25.3314 4.752H21.9474ZM41.4787 5.76C42.6787 5.76 43.6307 6.12 44.3347 6.84C45.0387 7.56 45.3907 8.576 45.3907 9.888V18H40.5427V11.088C40.5427 10.48 40.4387 10.048 40.2307 9.792C40.0387 9.52 39.7427 9.384 39.3427 9.384C38.8307 9.384 38.4307 9.576 38.1427 9.96C37.8707 10.344 37.7347 10.912 37.7347 11.664V18H32.8867V11.088C32.8867 10.48 32.7827 10.048 32.5747 9.792C32.3827 9.52 32.0867 9.384 31.6867 9.384C31.1907 9.384 30.7987 9.576 30.5107 9.96C30.2227 10.344 30.0787 10.92 30.0787 11.688V18H25.2307V6H29.5987L29.7187 8.472C30.0867 7.592 30.6147 6.92 31.3027 6.456C32.0067 5.992 32.8467 5.76 33.8227 5.76C34.7347 5.76 35.5027 5.968 36.1267 6.384C36.7667 6.8 37.2227 7.4 37.4947 8.184C37.8627 7.4 38.3907 6.8 39.0787 6.384C39.7667 5.968 40.5667 5.76 41.4787 5.76ZM59.8753 11.712C59.8753 12.288 59.8353 12.752 59.7552 13.104H51.8593C51.9553 13.776 52.1713 14.248 52.5073 14.52C52.8433 14.792 53.3153 14.928 53.9233 14.928C54.8993 14.928 55.4993 14.544 55.7233 13.776L59.6353 14.904C59.3313 15.992 58.6673 16.824 57.6433 17.4C56.6353 17.96 55.3953 18.24 53.9233 18.24C51.7473 18.24 50.0833 17.704 48.9313 16.632C47.7793 15.544 47.2033 14 47.2033 12C47.2033 10.016 47.7633 8.48 48.8833 7.392C50.0193 6.304 51.6113 5.76 53.6593 5.76C55.6593 5.76 57.1953 6.296 58.2673 7.368C59.3393 8.424 59.8753 9.872 59.8753 11.712ZM53.6833 9.048C53.1553 9.048 52.7393 9.2 52.4353 9.504C52.1473 9.808 51.9553 10.304 51.8593 10.992H55.3393C55.2593 10.336 55.0833 9.848 54.8113 9.528C54.5553 9.208 54.1793 9.048 53.6833 9.048ZM66.9794 18.24C65.5554 18.24 64.3394 18.088 63.3314 17.784C62.3394 17.48 61.5154 16.984 60.8594 16.296L63.1394 13.656C63.5554 14.152 64.0674 14.536 64.6754 14.808C65.2834 15.064 65.9554 15.192 66.6914 15.192C67.1074 15.192 67.4434 15.144 67.6994 15.048C67.9554 14.952 68.0834 14.808 68.0834 14.616C68.0834 14.44 67.9394 14.288 67.6514 14.16C67.3634 14.016 66.8514 13.864 66.1154 13.704C64.3554 13.368 63.0834 12.888 62.2994 12.264C61.5314 11.64 61.1474 10.832 61.1474 9.84C61.1474 9.152 61.3714 8.496 61.8194 7.872C62.2834 7.248 62.9714 6.744 63.8834 6.36C64.8114 5.96 65.9554 5.76 67.3154 5.76C69.9234 5.76 71.8034 6.424 72.9554 7.752L70.7714 10.128C70.0194 9.248 68.9314 8.808 67.5074 8.808C67.0114 8.808 66.6354 8.872 66.3794 9C66.1234 9.112 65.9954 9.264 65.9954 9.456C65.9954 9.616 66.1314 9.76 66.4034 9.888C66.6914 10 67.1634 10.112 67.8194 10.224C69.6274 10.496 70.9314 10.944 71.7314 11.568C72.5474 12.176 72.9554 13.024 72.9554 14.112C72.9554 15.312 72.4514 16.304 71.4434 17.088C70.4354 17.856 68.9474 18.24 66.9794 18.24Z" fill="#fff"/>
    </svg>
    `;
  logoWrapper.innerHTML = logo;

  const socialMediaWrapper = createBlock(BlockType.div, ['footer__social-wrapper']);

  const facebookLink = createLink(['footer__icon-wrapper'], '', ''); // add the link
  const facebook =
    '<svg fill="#fff" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-337 273 123.5 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path> </g></svg>';
  facebookLink.innerHTML = facebook;

  const instagramLink = createLink(['footer__icon-wrapper'], '', ''); // add the link
  const instagram =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#fff"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#fff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#fff"></path> </g></svg>';
  instagramLink.innerHTML = instagram;

  const twitterLink = createLink(['footer__icon-wrapper'], '', ''); // add the link
  const twitter =
    '<svg width="20" height="20" viewBox="0 -2 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>twitter [#154]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)" fill="#fff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]"> </path> </g> </g> </g> </g></svg>';
  twitterLink.innerHTML = twitter;

  socialMediaWrapper.append(facebookLink, instagramLink, twitterLink);

  wrapper.append(logoWrapper, socialMediaWrapper);
  footer.append(wrapper);
  return footer;
}
