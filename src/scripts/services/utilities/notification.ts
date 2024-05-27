import { BlockType, NotificationType } from '../../components/types/enums';
import { createBlock } from './tags';

export class NotificationService {
  static showNotification(message: string, type: NotificationType = NotificationType.info): void {
    const notification = createBlock(BlockType.div, ['notification', type]);
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
