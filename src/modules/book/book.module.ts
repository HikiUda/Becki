import { Module } from '@nestjs/common';
import { EditBookModule } from './editBook/editBook.module';
// import { QuickSearchModule } from './quick-search/quickSearch.module';
// import { CatalogModule } from './catalog/catalog.module';
// import { LastUpdatedModule } from './last-updated/lastUpdated.module';
// import { RelatedBookModule } from './related/relatedBook.module';

@Module({
    imports: [EditBookModule],
})
export class BookModule {}
