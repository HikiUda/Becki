import { Module } from '@nestjs/common';
import { MangaChaptersModule } from './manga/mangaChapters.module';
import { RanobeChaptersModule } from './ranobe/ranobeChapters.module';

@Module({
    imports: [MangaChaptersModule, RanobeChaptersModule],
})
export class ChaptersModule {}
