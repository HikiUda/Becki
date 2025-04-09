import { Module } from '@nestjs/common';
import { PublicMangaModule } from './publicManga/publicManga.module';
import { EditMangaModule } from './editManga/editManga.module';
import { IndividualMangaModule } from './individualManga/individualManga.module';
import { MangaCategoriesModule } from './mangaCategories/mangaCategories.module';
import { MangaStatisticModule } from './mangaStatistic/mangaStatistic.module';

@Module({
    imports: [
        PublicMangaModule,
        EditMangaModule,
        IndividualMangaModule,
        MangaCategoriesModule,
        MangaStatisticModule,
    ],
})
export class MangaModule {}
