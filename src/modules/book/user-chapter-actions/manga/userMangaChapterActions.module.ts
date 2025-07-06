import { Module } from '@nestjs/common';
import { UserMangaChapterActionsController } from './userMangaChapterActions.controller';
import { UserMangaChapterActionsService } from './userMangaChapterActions.service';
import { UserMangaChapterActionsRepository } from './userMangaChapterActions.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [UserMangaChapterActionsController],
    providers: [UserMangaChapterActionsService, UserMangaChapterActionsRepository, PrismaService],
})
export class UserMangaChapterActionsModule {}
