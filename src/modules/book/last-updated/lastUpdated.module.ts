import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { LastUpdatedController } from './lastUpdated.controller';
import { LastUpdatedService } from './lastUpdated.service';
import { LastUpdatedRepository } from './lastUpdated.repository';

@Module({
    imports: [],
    controllers: [LastUpdatedController],
    providers: [PrismaService, LastUpdatedService, LastUpdatedRepository],
})
export class LastUpdatedModule {}
