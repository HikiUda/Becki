import { Module } from '@nestjs/common';
import { RanobeChaptersController } from './ranobeChapters.controller';
import { RanobeChaptersService } from './ranobeChapters.service';
import { RanobeChaptersRepository } from './ranobeChapters.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [RanobeChaptersController],
    providers: [RanobeChaptersService, RanobeChaptersRepository, PrismaService],
})
export class RanobeChaptersModule {}
