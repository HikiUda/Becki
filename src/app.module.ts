import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { validateEnv } from './shared/config/env.validation';
import { BookModule } from './modules/book/book.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthorizationModule } from './modules/authorization/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
        ScheduleModule.forRoot(),
        AuthorizationModule,
        UserModule,
        BookModule,
    ],
})
export class AppModule {}
