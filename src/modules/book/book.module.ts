import { Module } from '@nestjs/common';
import { EditBookModule } from './edit-book/editBook.module';
import { EditBookCoversModule } from './edit-covers/editCover.module';
import { EditBookChaptersModule } from './edit-chapters/editBookChapters.module';
// import { QuickSearchModule } from './quick-search/quickSearch.module';
// import { CatalogModule } from './catalog/catalog.module';
// import { LastUpdatedModule } from './last-updated/lastUpdated.module';
// import { RelatedBookModule } from './related/relatedBook.module';

@Module({
    imports: [EditBookModule, EditBookChaptersModule, EditBookCoversModule],
})
export class BookModule {}
