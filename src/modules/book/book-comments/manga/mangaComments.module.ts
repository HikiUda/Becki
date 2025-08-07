import { Module } from '@nestjs/common';
import { MangaCommentsController } from './mangaComments.controller';
import { MangaCommentsService } from './mangaComments.service';
import { MangaCommentsRepository } from './mangaComments.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [MangaCommentsController],
    providers: [MangaCommentsService, MangaCommentsRepository, PrismaService],
})
export class MangaCommentsModule {}
