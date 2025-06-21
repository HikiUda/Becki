import { Module } from '@nestjs/common';
import { QuickSearchMangaModule } from './manga/quickSearchManga.module';

@Module({
    imports: [QuickSearchMangaModule],
})
export class QuickSearchModule {}
