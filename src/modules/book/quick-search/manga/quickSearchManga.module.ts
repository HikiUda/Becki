import { Module } from '@nestjs/common';
import { QuickSearchMangaController } from './quickSearchManga.controller';
import { QuickSearchMangaService } from './quickSearchManga.service';
import { QuickSearchMangaRepository } from './quickSearchManga.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [QuickSearchMangaController],
    providers: [QuickSearchMangaService, QuickSearchMangaRepository, PrismaService],
})
export class QuickSearchMangaModule {}
