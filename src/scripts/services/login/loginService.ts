import { NotificationType } from '../../components/types/enums';
import { apiAnonRoot } from '../api';
import { NotificationService } from '../utilities/notification';

export class LoginService {
  static async login(email: string, password: string): Promise<void> {
    await apiAnonRoot
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
        window.location.pathname = '/index';
      })
      .catch((error) => {
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${error.body.message}`,
          NotificationType.error
        );
        localStorage.clear();
      });
  }
}
