import { DynamicModule } from '@nestjs/common';
import { DEFAULT_ADMIN } from './constants';
import translationsRu from './locale/ru/translation.json';
import { User } from '../users/entities/user.entity';
//import { createConnection } from 'typeorm';

export async function createAdminModule(): Promise<DynamicModule> {
  const { AdminModule } = await import('@adminjs/nestjs');
  const { DefaultAuthProvider, ComponentLoader } = await import('adminjs');
  //const { Database, Resource } = await import('@adminjs/typeorm');

  const componentLoader = new ComponentLoader();

  // Get the TypeORM connection
  // const connection = await createConnection();

  return AdminModule.createAdminAsync({
    useFactory: async () => ({
      adminJsOptions: {
        componentLoader,
        rootPath: '/admin',
        resources: [],
        databases: [],
        locale: {
          language: 'ru',
          availableLanguages: ['en', 'ru'],
          localeDetection: true,
          translations: {
            ru: translationsRu,
          },
        },
      },
      auth: {
        provider: new DefaultAuthProvider({
          componentLoader,
          authenticate: async ({ email, password }) => {
            if (email === DEFAULT_ADMIN.email) {
              return { email };
            }

            return null;
          },
        }),
        cookiePassword: `process.env.COOKIE_SECRET`,
        cookieName: 'adminjs',
      },
      sessionOptions: {
        resave: true,
        saveUninitialized: true,
        secret: `process.env.COOKIE_SECRET`,
      },
    }),
  });
}
