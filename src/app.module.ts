import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RouterModule.register([
      {
        path: `api`,
        children: [AuthModule, UsersModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
