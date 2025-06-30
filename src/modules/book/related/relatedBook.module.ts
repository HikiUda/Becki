import { Module } from '@nestjs/common';
import { RelatedMangaModule } from './manga/relatedManga.module';
import { RelatedRanobeModule } from './ranobe/relatedRanobe.module';

@Module({
    imports: [RelatedMangaModule, RelatedRanobeModule],
})
export class RelatedBookModule {}
