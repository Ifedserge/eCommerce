import { NotificationService } from '../utilities/notification';
import { NotificationType } from '../../components/types/enums';

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
  ) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          lastName,
          dateOfBirth,
          city,
          street,
          postalCode,
          country,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      NotificationService.showNotification('Registration successful', NotificationType.success);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        NotificationService.showNotification(error.message, NotificationType.error);
      } else {
        NotificationService.showNotification('An unknown error occurred', NotificationType.error);
      }
      return null;
    }
  }
}
