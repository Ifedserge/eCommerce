import { NotificationType } from '../../components/types/enums';
import { apiRoot } from '../api';
import { NotificationService } from '../utilities/notification';

export class RegistrationService {
  static async register(
    email: string,
    password: string,
    name: string,
    lastName: string,
    dateOfBirth: string,
    city: string,
    street: string,
    postalCode: string,
    country: string,
  ): Promise<void> {
    await apiRoot
      .customers()
      .post({
        body: {
          email,
          password,
          firstName: name,
          lastName,
          addresses: [{
            city,
            streetName: street,
            postalCode,
            country,
          }],
          dateOfBirth,
        },
      })
      .execute()
      .then(() => {
        NotificationService.showNotification('Registration successful!', NotificationType.success);
      })
      .catch((error) => {
        NotificationService.showNotification(`Something went wrong. Please try again. Error: ${error.body.message}`, NotificationType.error);
      });
  }
}
