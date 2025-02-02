import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      validationSchema: Joi.object({
        // Настройки подключения к базе данных PostgreSQL
        DB_TYPE: Joi.string().valid('postgres').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().integer().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(true), // Необязательное поле
        DB_LOGGING: Joi.boolean().default(true), // Необязательное поле
        // Порт приложения
        PORT: Joi.number().integer().default(3000), // Необязательное поле
        // Среда выполнения
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        // Настройки adminJs
        COOKIE_SECRET: Joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
