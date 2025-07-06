import { Module } from '@nestjs/common';
import { UserRanobeChapterActionsController } from './userRanobeChapterActions.controller';
import { UserRanobeChapterActionsService } from './userRanobeChapterActions.service';
import { UserRanobeChapterActionsRepository } from './userRanobeChapterActions.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [UserRanobeChapterActionsController],
    providers: [UserRanobeChapterActionsService, UserRanobeChapterActionsRepository, PrismaService],
})
export class UserRanobeChapterActionsModule {}
