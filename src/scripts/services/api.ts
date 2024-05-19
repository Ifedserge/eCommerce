import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';

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
  tokenCache: {
    get: (): TokenStore => ({
      token: localStorage.getItem('token') || '',
      expirationTime: parseInt(localStorage.getItem('expirationTime') || '0', 10),
      refreshToken: localStorage.getItem('refreshToken') || '',
    }),
    set: (cache: TokenStore): void => {
      localStorage.clear();
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

const ctpClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: `${process.env.CTP_PROJECT_KEY}` });
