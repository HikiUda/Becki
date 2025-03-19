import { Module } from '@nestjs/common';

import { MangaModule } from './modules/manga/manga.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file/file.module';

@Module({
    imports: [MangaModule, ConfigModule.forRoot(), FileModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
