import { Module } from '@nestjs/common';
import { PublicMangaController } from './publicManga.controller';
import { PublicMangaRepository } from './publicManga.repository';
import { PublicMangaService } from './publicManga.service';

@Module({
    controllers: [PublicMangaController],
    providers: [PublicMangaService, PublicMangaRepository],
})
export class PublicMangaModule {}
