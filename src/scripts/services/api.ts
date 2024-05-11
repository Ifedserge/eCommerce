import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
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
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${process.env.CTP_API_URL}`,
  fetch,
};

const ctpClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: `${process.env.CTP_PROJECT_KEY}` });
