import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { MangaRepository } from './manga.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [MangaController],
    providers: [MangaService, MangaRepository, PrismaService],
})
export class MangaModule {}
