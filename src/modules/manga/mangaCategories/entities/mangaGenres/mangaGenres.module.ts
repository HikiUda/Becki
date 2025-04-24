import { Module } from '@nestjs/common';
import { MangaGenresController } from './mangaGenres.controller';
import { MangaGenresRepository } from './mangaGenres.repository';
import { MangaGenresService } from './mangaGenres.service';

@Module({
    controllers: [MangaGenresController],
    providers: [MangaGenresService, MangaGenresRepository],
})
export class MangaGenresModule {}
