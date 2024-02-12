import * as Joi from 'joi';

const NODE_ENV = 'NODE_ENV';
const DEV = 'development';
const PROD = 'production';

const PORT = Joi.number().integer().positive().required();
const URI = Joi.string().uri().required();
const NAME = Joi.string().min(3).max(30).required();
const EMAIL = Joi.string().email().min(10).required();

export const joiConfigSchema = Joi.object({
  NODE_ENV: Joi.valid(DEV, PROD).required(),
  PORT: Joi.number().integer().min(1000),
  DATABASE_URL: Joi.when(NODE_ENV, {
    is: PROD,
    then: URI,
  }),
  POSTGRES_DB: Joi.when(NODE_ENV, {
    is: DEV,
    then: NAME,
  }),
  POSTGRES_USER: Joi.when(NODE_ENV, {
    is: DEV,
    then: NAME,
  }),
  POSTGRES_PASSWORD: Joi.when(NODE_ENV, {
    is: DEV,
    then: NAME,
  }),
  POSTGRES_HOST: Joi.when(NODE_ENV, {
    is: DEV,
    then: NAME,
  }),
  POSTGRES_PORT: Joi.when(NODE_ENV, {
    is: DEV,
    then: PORT,
  }),
  PGADMIN_EMAIL: Joi.when(NODE_ENV, {
    is: DEV,
    then: EMAIL,
  }),
  PGADMIN_PASSWORD: Joi.when(NODE_ENV, {
    is: DEV,
    then: NAME,
  }),
  PGADMIN_HOST_PORT: Joi.when(NODE_ENV, {
    is: DEV,
    then: PORT,
  }),
  PGADMIN_PORT: Joi.when(NODE_ENV, {
    is: DEV,
    then: PORT,
  }),
  REDIS_HOST: Joi.string().min(8).max(100).required(),
  REDIS_PORT: Joi.number().integer().min(1000).required(),
  REDIS_PASSWORD: Joi.when(NODE_ENV, {
    is: PROD,
    then: Joi.string().min(20).max(64).required(),
  }),
  CLOUDINARY_CLOUD_NAME: Joi.string().min(3).required(),
  CLOUDINARY_API_KEY: Joi.number().integer().min(100000).required(),
  CLOUDINARY_API_SECRET: Joi.string().min(6).required(),
});
