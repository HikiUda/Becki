import { Module } from '@nestjs/common';
import { MangaGenresModule } from './entities/mangaGenres/mangaGenres.module';
import { MangaTagsModule } from './entities/mangaTags/mangaTags.module';

@Module({
    imports: [MangaGenresModule, MangaTagsModule],
})
export class MangaCategoriesModule {}
