import { Module } from '@nestjs/common';
import { QuickSearchModule } from './quick-search/quickSearch.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
    imports: [CatalogModule, QuickSearchModule],
})
export class BookModule {}
