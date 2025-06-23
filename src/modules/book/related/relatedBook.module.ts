import { Module } from '@nestjs/common';
import { RelatedMangaModule } from './manga/relatedManga.module';

@Module({
    imports: [RelatedMangaModule],
})
export class RelatedBookModule {}
