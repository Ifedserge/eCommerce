import { NotificationType } from '../../components/types/enums';
import { Api } from '../api';
import { convertToUserProfile } from '../utilities/converter';
import { encryptCipher } from '../utilities/encryptor';
import { NotificationService } from '../utilities/notification';

export class LoginService {
  static async login(email: string, password: string): Promise<void> {
    const apiAnonRoot = Api.createAnonClient();
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

        const apiAuthRoot = Api.createAuthClient();
        apiAuthRoot
          .me()
          .get()
          .execute()
          .then((response) => {
            const user = convertToUserProfile(response);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.removeItem('anonymousId');
            localStorage.removeItem('cartData');
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
