import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { createAdminModule } from './admin/admin.module';

@Module({
  imports: [createAdminModule(), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
