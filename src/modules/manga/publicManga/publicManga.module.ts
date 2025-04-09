import { Module } from '@nestjs/common';
import { PublicMangaController } from './entities/publicManga/publicManga.controller';
import { PublicMangaService } from './entities/publicManga/publicManga.service';
import { PublicMangaRepository } from './entities/publicManga/publicManga.repository';
import { QuickSearchModule } from './entities/quickSearch/quickSearch.module';
import { ContinueReadMangaModule } from './entities/continueReadManga/continueReadManga.module';

@Module({
    imports: [QuickSearchModule, ContinueReadMangaModule],
    controllers: [PublicMangaController],
    providers: [PublicMangaService, PublicMangaRepository],
})
export class PublicMangaModule {}
