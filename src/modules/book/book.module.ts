import { Module } from '@nestjs/common';
import { QuickSearchModule } from './quick-search/quickSearch.module';

@Module({
    imports: [QuickSearchModule],
})
export class BookModule {}
