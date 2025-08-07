import { Module } from '@nestjs/common';
import { MangaCommentsModule } from './manga/mangaComments.module';

@Module({
    imports: [MangaCommentsModule],
})
export class BookCommentsModule {}
