import { NotificationType } from '../../components/types/enums';
import { apiAnonRoot, apiAuthRoot } from '../api';
import { encryptCipher } from '../utilities/encryptor';
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
        localStorage.setItem('email', email);
        localStorage.setItem('encryptPassword', encryptCipher(password));

        apiAuthRoot
          .me()
          .get()
          .execute()
          .then(() => {
            NotificationService.showNotification('Login successful!', NotificationType.success);
            window.location.pathname = '/index';
          })
          .catch((error) => {
            NotificationService.showNotification(
              `Something went wrong. Please try again. Error: ${error}`,
              NotificationType.error
            );
            localStorage.clear();
          });
      })
      .catch((error) => {
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${error}`,
          NotificationType.error
        );
        localStorage.clear();
      });
  }
}
