import { Module } from '@nestjs/common';
import { PublicMangaModule } from './publicManga/publicManga.module';
import { EditMangaModule } from './editManga/editManga.module';
import { IndividualMangaModule } from './individualManga/individualManga.module';

@Module({
    imports: [PublicMangaModule, EditMangaModule, IndividualMangaModule],
})
export class MangaModule {}
