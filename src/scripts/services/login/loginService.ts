import { NotificationType } from '../../components/types/enums';
import { apiRoot } from '../api';
import { NotificationService } from '../utilities/notification';

export class LoginService {
  static async login(email: string, password: string): Promise<void> {
    await apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute()
      .then(() => {
        NotificationService.showNotification('Login successful!', NotificationType.success);
      })
      .catch((error) => {
        console.log(error);
        NotificationService.showNotification(`Something went wrong. Please try again. Error: ${error.body.message}`, NotificationType.error);
      });
  }
}
