import * as dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV as 'production' | 'development';

dotenv.config();
const environmentVariables = {
  env: NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  isProd: NODE_ENV === 'production',
};

export const PORT = environmentVariables.port;
export const ENV = environmentVariables.env;
export const isProd = environmentVariables.isProd;
