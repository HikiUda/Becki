import { Module } from '@nestjs/common';
import { MangaModule, RanobeModule } from './book';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { CatalogModule } from './catalog/catalog.module';
import { CategoriesModule } from './categories/categories.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ContinueReadBookModule } from './continue-read/continueRead.module';
import { EditBookModule } from './edit-book/editBook.module';
import { EditBookChaptersModule } from './edit-chapters/editBookChapters.module';
import { EditBookCoversModule } from './edit-covers/editCover.module';
import { EditPeopleModule } from './edit-people/editPeople.module';
import { LastUpdatedModule } from './last-updated/lastUpdated.module';
import { PeopleModule } from './people/people.module';
import { QuickSearchModule } from './quick-search/quickSearch.module';
import { RateModule } from './rate/rate.module';
import { RelatedBookModule } from './related/relatedBook.module';
import { StatisticModule } from './statistic/statistic.module';
import { UserChapterActionsModule } from './user-chapter-actions/userChapterActions.module';

@Module({
    imports: [
        MangaModule,
        RanobeModule,
        BookmarksModule,
        CatalogModule,
        CategoriesModule,
        ChaptersModule,
        ContinueReadBookModule,
        EditBookModule,
        EditBookChaptersModule,
        EditBookCoversModule,
        EditPeopleModule,
        LastUpdatedModule,
        PeopleModule,
        QuickSearchModule,
        RateModule,
        RelatedBookModule,
        StatisticModule,
        UserChapterActionsModule,
    ],
})
export class BookModule {}
