import { Module } from '@nestjs/common';
import { MangaModule, RanobeModule } from './book';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { CatalogModule } from './catalog/catalog.module';
import { CategoriesModule } from './categories/categories.module';
import { ContinueReadBookModule } from './continue-read/continueRead.module';
import { EditBookModule } from './edit-book/editBook.module';
import { EditBookCoversModule } from './edit-covers/editCover.module';
import { EditBookChaptersModule } from './edit-chapters/editBookChapters.module';
import { LastUpdatedModule } from './last-updated/lastUpdated.module';
import { QuickSearchModule } from './quick-search/quickSearch.module';
import { RateModule } from './rate/rate.module';
import { RelatedBookModule } from './related/relatedBook.module';

@Module({
    imports: [
        MangaModule,
        RanobeModule,
        BookmarksModule,
        CatalogModule,
        CategoriesModule,
        ContinueReadBookModule,
        EditBookModule,
        EditBookChaptersModule,
        EditBookCoversModule,
        LastUpdatedModule,
        QuickSearchModule,
        RateModule,
        RelatedBookModule,
    ],
})
export class BookModule {}
