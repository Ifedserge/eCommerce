import { Cart } from '@commercetools/platform-sdk';
import { createBlock, createHeading, createP, createImg, createButton } from './tags';
import { BlockType, HeadingType } from '../../components/types/enums';
import { convertPrice } from './convertPrice';
import { updateCartItemQuantity } from './updateCartItemQuantity';
import { removeCartItem } from './removeCartItem';

export const renderCartItems = async (cart: Cart, container: HTMLElement): Promise<void> => {
  const tempContainer = document.createDocumentFragment();
  const newContainer = container;

  if (cart.lineItems.length === 0) {
    const emptyMessage = createP(['basket__empty-message'], 'The cart is empty.');
    tempContainer.appendChild(emptyMessage);
    newContainer.innerHTML = '';
    container.appendChild(tempContainer);
    return;
  }

  let totalPrice = 0;

  const lineItems = await Promise.all(
    cart.lineItems.map(async (item) => {
      const productBlock = createBlock(BlockType.div, ['basket__item']);

      if (item.variant && item.variant.images && item.variant.images.length > 0) {
        const productImg = createImg(
          ['basket__item-img'],
          item.variant.images[0].url,
          item.name['en-GB']
        );
        productBlock.appendChild(productImg);
      }

      const productName = createHeading(['basket__item-name'], item.name['en-GB'], HeadingType.h2);
      const productPrice = createP(
        ['basket__item-price'],
        convertPrice(item.price.value.centAmount, item.price.value.fractionDigits)
      );

      const quantityBlock = createBlock(BlockType.div, ['basket__item-quantity']);

      const minusButton = createButton(['basket__item-minus'], '-');
      minusButton.addEventListener('click', async () => {
        const newQuantity = item.quantity - 1;
        if (newQuantity > 0) {
          const updatedCart = await updateCartItemQuantity(
            cart.id,
            item.id,
            newQuantity,
            cart.version
          );
          if (updatedCart) {
            await renderCartItems(updatedCart, container);
          }
        }
      });

      const quantityText = createP(['basket__item-quantity-text'], item.quantity.toString());

      const plusButton = createButton(['basket__item-plus'], '+');
      plusButton.addEventListener('click', async () => {
        const newQuantity = item.quantity + 1;
        const updatedCart = await updateCartItemQuantity(
          cart.id,
          item.id,
          newQuantity,
          cart.version
        );
        if (updatedCart) {
          await renderCartItems(updatedCart, container);
        }
      });

      const removeButton = createButton(['basket__item-remove'], 'Remove');
      removeButton.addEventListener('click', async () => {
        const updatedCart = await removeCartItem(cart.id, item.id, cart.version);
        if (updatedCart) {
          await renderCartItems(updatedCart, container);
        }
      });

      quantityBlock.append(minusButton, quantityText, plusButton, removeButton);

      productBlock.append(productName, productPrice, quantityBlock);
      totalPrice += item.price.value.centAmount * item.quantity;

      return productBlock;
    })
  );

  lineItems.forEach((item) => tempContainer.appendChild(item));

  const totalPriceBlock = createBlock(BlockType.div, ['basket__total']);
  const totalPriceText = createP(
    ['basket__total-text'],
    `Total Price: ${convertPrice(totalPrice, cart.lineItems[0].price.value.fractionDigits)}`
  );
  totalPriceBlock.append(totalPriceText);
  tempContainer.appendChild(totalPriceBlock);

  newContainer.innerHTML = '';
  container.appendChild(tempContainer);
};
