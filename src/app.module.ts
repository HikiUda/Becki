import { Module } from '@nestjs/common';

import { MangaModule } from './modules/manga/manga.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { validateEnv } from './shared/helpers/envConfigValidator/env.validation';
import { BookModule } from './modules/book/book.module';

@Module({
    imports: [
        UserModule,
        MangaModule,
        ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
        FileModule,
        BookModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
