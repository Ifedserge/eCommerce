import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { decryptCipher } from './utilities/encryptor';

export class Api {
  private static s_projectKey: string;

  private static s_scopes: string[];

  private static s_authMiddlewareOptions: AuthMiddlewareOptions;

  private static s_passwordMiddlewareOptions: PasswordAuthMiddlewareOptions;

  private static s_tokenMiddlewareOptions: RefreshAuthMiddlewareOptions;

  private static s_httpMiddlewareOptions: HttpMiddlewareOptions;

  private static get projectKey(): string {
    if (!this.s_projectKey) {
      this.s_projectKey = `${process.env.CTP_PROJECT_KEY}`;
    }
    return this.s_projectKey;
  }

  private static get scopes(): string[] {
    if (!this.s_scopes) {
      this.s_scopes = [`${process.env.CTP_SCOPES}`];
    }
    return this.s_scopes;
  }

  private static get authMiddlewareOptions(): AuthMiddlewareOptions {
    if (!this.s_authMiddlewareOptions) {
      this.s_authMiddlewareOptions = {
        host: `${process.env.CTP_AUTH_URL}`,
        projectKey: this.projectKey,
        credentials: {
          clientId: `${process.env.CTP_CLIENT_ID}`,
          clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
        },
        scopes: this.scopes,
        fetch,
      };
    }
    return this.s_authMiddlewareOptions;
  }

  private static get passwordMiddlewareOptions(): PasswordAuthMiddlewareOptions {
    if (!this.s_passwordMiddlewareOptions) {
      this.s_passwordMiddlewareOptions = {
        host: `${process.env.CTP_AUTH_URL}`,
        projectKey: this.projectKey,
        credentials: {
          clientId: `${process.env.CTP_CLIENT_ID}`,
          clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
          user: {
            username: localStorage.getItem('email') || '',
            password: decryptCipher(localStorage.getItem('encryptPassword') || ''),
          },
        },
        scopes: this.scopes,
        tokenCache: {
          get: (): TokenStore => ({
            token: localStorage.getItem('token') || '',
            expirationTime: parseInt(localStorage.getItem('expirationTime') || '0', 10),
            refreshToken: localStorage.getItem('refreshToken') || '',
          }),
          set: (cache: TokenStore): void => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('token', cache.token);
            localStorage.setItem('expirationTime', cache.expirationTime.toString());
            localStorage.setItem('refreshToken', cache.refreshToken!);
          },
        },
        fetch,
      };
    }
    return this.s_passwordMiddlewareOptions;
  }

  private static get tokenMiddlewareOptions(): RefreshAuthMiddlewareOptions {
    if (!this.s_tokenMiddlewareOptions) {
      this.s_tokenMiddlewareOptions = {
        host: `${process.env.CTP_AUTH_URL}`,
        projectKey: this.projectKey,
        credentials: {
          clientId: `${process.env.CTP_CLIENT_ID}`,
          clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
        },
        refreshToken: localStorage.getItem('refreshToken') || '',
        tokenCache: {
          get: (): TokenStore => ({
            token: localStorage.getItem('token') || '',
            expirationTime: parseInt(localStorage.getItem('expirationTime') || '0', 10),
            refreshToken: localStorage.getItem('refreshToken') || '',
          }),
          set: (cache: TokenStore): void => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('token', cache.token);
            localStorage.setItem('expirationTime', cache.expirationTime.toString());
            localStorage.setItem('refreshToken', cache.refreshToken!);
          },
        },
        fetch,
      };
    }
    return this.s_tokenMiddlewareOptions;
  }

  private static get httpMiddlewareOptions(): HttpMiddlewareOptions {
    if (!this.s_httpMiddlewareOptions) {
      this.s_httpMiddlewareOptions = {
        host: `${process.env.CTP_API_URL}`,
        fetch,
      };
    }
    return this.s_httpMiddlewareOptions;
  }

  static createAnonClient(): ByProjectKeyRequestBuilder {
    const ctpAnonClient: Client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withAnonymousSessionFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(ctpAnonClient).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  static createAuthClient(): ByProjectKeyRequestBuilder {
    const ctpAuthClient: Client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withPasswordFlow(this.passwordMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(ctpAuthClient).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  static createTokenClient(): ByProjectKeyRequestBuilder {
    const ctpTokenClient: Client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withRefreshTokenFlow(this.tokenMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(ctpTokenClient).withProjectKey({
      projectKey: this.projectKey,
    });
  }
}

// export const apiAnonRoot = Api.createAnonClient();
// export const apiAuthRoot = Api.createAuthClient();
