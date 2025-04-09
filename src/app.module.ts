import { Module } from '@nestjs/common';

import { MangaModule } from './modules/manga/manga.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { validateEnv } from './common/helpers/envConfigValidator/env.validation';

@Module({
    imports: [
        UserModule,
        MangaModule,
        ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
        FileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
