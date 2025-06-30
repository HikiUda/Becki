import { Module } from '@nestjs/common';
import { QuickSearchMangaModule } from './manga/quickSearchManga.module';
import { QuickSearchRanobeModule } from './ranobe/quickSearchRanobe.module';

@Module({
    imports: [QuickSearchMangaModule, QuickSearchRanobeModule],
})
export class QuickSearchModule {}
