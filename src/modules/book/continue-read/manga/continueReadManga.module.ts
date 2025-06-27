import { Module } from '@nestjs/common';
import { ContinueReadMangaController } from './continueReadManga.controller';
import { ContinueReadMangaRepository } from './continueReadManga.repository';
import { ContinueReadMangaService } from './continueReadManga.service';

@Module({
    controllers: [ContinueReadMangaController],
    providers: [ContinueReadMangaService, ContinueReadMangaRepository],
})
export class ContinueReadMangaModule {}
