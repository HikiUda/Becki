import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { validateEnv } from './shared/config/env.validation';
import { BookModule } from './modules/book/book.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
        ScheduleModule.forRoot(),
        UserModule,
        BookModule,
    ],
})
export class AppModule {}
