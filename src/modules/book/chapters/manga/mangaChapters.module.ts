import { Module } from '@nestjs/common';
import { MangaChaptersController } from './mangaChapters.controller';
import { MangaChaptersService } from './mangaChapters.service';
import { MangaChaptersRepository } from './mangaChapters.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [MangaChaptersController],
    providers: [MangaChaptersService, MangaChaptersRepository, PrismaService],
})
export class MangaChaptersModule {}
