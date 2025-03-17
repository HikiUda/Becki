import { Module } from '@nestjs/common';
import { MutateMangaController } from './mutateManga.controller';
import { MutateMangaRepository } from './mutateManga.repository';
import { MutateMangaService } from './mutateManga.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
    controllers: [MutateMangaController],
    providers: [MutateMangaService, MutateMangaRepository, PrismaService],
})
export class MutateMangaModule {}
