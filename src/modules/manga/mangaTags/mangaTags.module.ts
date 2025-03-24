import { Module } from '@nestjs/common';
import { MangaTagsController } from './mangaTags.controller';
import { MangaTagsRepository } from './mangaTags.repository';
import { MangaTagsService } from './mangaTags.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [MangaTagsController],
  providers: [MangaTagsService, MangaTagsRepository, PrismaService],
})
export class MangaTagsModule {}
