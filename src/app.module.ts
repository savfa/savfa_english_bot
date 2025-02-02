import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { createAdminModule } from './admin/admin.module';
import { AppConfigModule } from './config/appConfig.module';

@Module({
  imports: [createAdminModule(), AppConfigModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
