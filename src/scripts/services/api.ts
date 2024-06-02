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

const projectKey: string = `${process.env.CTP_PROJECT_KEY}`;
const scopes: string[] = [`${process.env.CTP_SCOPES}`];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `${process.env.CTP_AUTH_URL}`,
  projectKey: `${process.env.CTP_PROJECT_KEY}`,
  credentials: {
    clientId: `${process.env.CTP_CLIENT_ID}`,
    clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
  },
  scopes,
  fetch,
};

const passwordMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: `${process.env.CTP_AUTH_URL}`,
  projectKey: `${process.env.CTP_PROJECT_KEY}`,
  credentials: {
    clientId: `${process.env.CTP_CLIENT_ID}`,
    clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
    user: {
      username: localStorage.getItem('email') || '',
      password: decryptCipher(localStorage.getItem('encryptPassword') || ''),
    },
  },
  scopes,
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

const tokenMiddlewareOptions: RefreshAuthMiddlewareOptions = {
  host: `${process.env.CTP_AUTH_URL}`,
  projectKey: `${process.env.CTP_PROJECT_KEY}`,
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

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${process.env.CTP_API_URL}`,
  fetch,
};

const ctpAnonClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const ctpAuthClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withPasswordFlow(passwordMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const ctpTokenClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withRefreshTokenFlow(tokenMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiAnonRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(
  ctpAnonClient
).withProjectKey({ projectKey: `${process.env.CTP_PROJECT_KEY}` });

export const apiAuthRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(
  ctpAuthClient
).withProjectKey({ projectKey: `${process.env.CTP_PROJECT_KEY}` });

export const apiTokenRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(
  ctpTokenClient
).withProjectKey({ projectKey: `${process.env.CTP_PROJECT_KEY}` });
