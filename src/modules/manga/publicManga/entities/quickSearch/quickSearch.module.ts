import { Module } from '@nestjs/common';
import { QuickSearchController } from './quickSearch.controller';
import { QuickSearchService } from './quickSearch.service';
import { QuickSearchRepository } from './quickSearch.repository';

@Module({
    controllers: [QuickSearchController],
    providers: [QuickSearchService, QuickSearchRepository],
})
export class QuickSearchModule {}
