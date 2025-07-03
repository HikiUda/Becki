import { Module } from '@nestjs/common';
import { ContinueReadMangaController } from './continueReadManga.controller';
import { ContinueReadMangaRepository } from './continueReadManga.repository';
import { ContinueReadMangaService } from './continueReadManga.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [ContinueReadMangaController],
    providers: [ContinueReadMangaService, ContinueReadMangaRepository, PrismaService],
})
export class ContinueReadMangaModule {}
