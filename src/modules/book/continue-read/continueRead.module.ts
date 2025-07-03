import { Module } from '@nestjs/common';
import { ContinueReadMangaModule } from './manga/continueReadManga.module';
import { ContinueReadRanobeModule } from './ranobe/continueReadRanobe.module';

@Module({
    imports: [ContinueReadMangaModule, ContinueReadRanobeModule],
})
export class ContinueReadBookModule {}
