import { Module } from '@nestjs/common';
import { MangaBookmarksModule } from './manga/mangaBookmarks.module';
import { ranobeBookmarksModule } from './ranobe/ranobeBookmarks.module';

@Module({
    imports: [MangaBookmarksModule, ranobeBookmarksModule],
})
export class BookmarksModule {}
