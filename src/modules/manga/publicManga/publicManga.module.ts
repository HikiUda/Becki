import { Module } from '@nestjs/common';
import { PublicMangaController } from './entities/publicManga/publicManga.controller';
import { PublicMangaService } from './entities/publicManga/publicManga.service';
import { PublicMangaRepository } from './entities/publicManga/publicManga.repository';
import { QuickSearchController } from './entities/quickSearch/quickSearch.controller';
import { QuickSearchService } from './entities/quickSearch/quickSearch.service';
import { QuickSearchRepository } from './entities/quickSearch/quickSearch.repository';

@Module({
    controllers: [PublicMangaController, QuickSearchController],
    providers: [
        PublicMangaService,
        PublicMangaRepository,
        QuickSearchService,
        QuickSearchRepository,
    ],
})
export class PublicMangaModule {}
