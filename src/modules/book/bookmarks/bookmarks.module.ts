import { Module } from '@nestjs/common';
import { MangaBookmarksModule } from './manga/mangaBookmarks.module';
import { RanobeBookmarksModule } from './ranobe/ranobeBookmarks.module';

@Module({
    imports: [MangaBookmarksModule, RanobeBookmarksModule],
})
export class BookmarksModule {}
