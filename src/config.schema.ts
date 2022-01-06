import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  //   STAGE: Joi.string().required(),
  APP_PORT: Joi.number().default(8000),
  JWT_SECRET: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('example'),
});
