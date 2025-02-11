import { DynamicModule } from '@nestjs/common';
import { DEFAULT_ADMIN } from './constants';
import translationsRu from './locale/ru/translation.json';
import { User } from '../users/entities/user.entity';

export async function createAdminModule(): Promise<DynamicModule> {
  const { AdminModule } = await import('@adminjs/nestjs');
  const { DefaultAuthProvider, ComponentLoader, AdminJS } = await import(
    'adminjs'
  );
  const { Database, Resource } = await import('@adminjs/typeorm');

  AdminJS.registerAdapter({ Database, Resource });
  const componentLoader = new ComponentLoader();

  componentLoader.add(
    `CustomPage`,
    './components/CustomPage/CustomPage',
    'add',
  );

  console.log(componentLoader.getComponents());

  return AdminModule.createAdminAsync({
    useFactory: async () => ({
      adminJsOptions: {
        componentLoader,
        rootPath: '/admin',
        locale: {
          language: 'ru',
          availableLanguages: ['en', 'ru'],
          localeDetection: true,
          translations: {
            ru: translationsRu,
          },
        },
        resources: [
          {
            resource: User, // Подключаем сущность User в админку
            options: {
              properties: {
                password: { isVisible: false }, // Скрываем пароль
              },
            },
          },
        ],
        databases: [], // TypeORM автоматически подтянет
        branding: {
          logo: false,
          companyName: 'English bot',
          withMadeWithLove: false,
        },
        pages: {
          'Кастомная страница': {
            handler: async (request, response, context) => {
              return {
                text: 'I am fetched from the backend',
              };
            },
            component: `CustomPage`,
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
