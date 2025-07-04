import { Module } from '@nestjs/common';
import { RanobeController } from './ranobe.controller';
import { RanobeService } from './ranobe.service';
import { RanobeRepository } from './ranobe.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [RanobeController],
    providers: [RanobeService, RanobeRepository, PrismaService],
})
export class RanobeModule {}
