import { Module } from '@nestjs/common';
import { MangaGenresController } from './mangaGenres.controller';
import { MangaGenresRepository } from './mangaGenres.repository';
import { MangaGenresService } from './mangaGenres.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
    controllers: [MangaGenresController],
    providers: [MangaGenresService, MangaGenresRepository, PrismaService],
})
export class MangaGenresModule {}
