import { Module } from '@nestjs/common';
import { MangaJanresController } from './mangaJanres.controller';
import { MangaJanresRepository } from './mangaJanres.repository';
import { MangaJanresService } from './mangaJanres.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [MangaJanresController],
  providers: [MangaJanresService, MangaJanresRepository, PrismaService],
})
export class MangaJanresModule {}
