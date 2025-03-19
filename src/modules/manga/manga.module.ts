import { Module } from '@nestjs/common';
import { PublicMangaModule } from './publicManga/publicManga.module';
import { EditMangaModule } from './editManga/editManga.module';

@Module({
    imports: [PublicMangaModule, EditMangaModule],
})
export class MangaModule {}
