import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { EditBookModule } from './edit-book/editBook.module';
import { EditBookCoversModule } from './edit-covers/editCover.module';
import { EditBookChaptersModule } from './edit-chapters/editBookChapters.module';
import { LastUpdatedModule } from './last-updated/lastUpdated.module';
import { QuickSearchModule } from './quick-search/quickSearch.module';
import { RelatedBookModule } from './related/relatedBook.module';

@Module({
    imports: [
        CatalogModule,
        EditBookModule,
        EditBookChaptersModule,
        EditBookCoversModule,
        LastUpdatedModule,
        QuickSearchModule,
        RelatedBookModule,
    ],
})
export class BookModule {}
