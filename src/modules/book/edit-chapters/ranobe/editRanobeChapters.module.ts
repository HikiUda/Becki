import { Module } from '@nestjs/common';
import { EditRanobeChaptersController } from './editRanobeChapters.controller';
import { EditRanobeChaptersService } from './editRanobeChapters.service';
import { EditRanobeChaptersRepository } from './editRanobeChapters.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [EditRanobeChaptersController],
    providers: [EditRanobeChaptersService, EditRanobeChaptersRepository, PrismaService],
})
export class EditRanobeChaptersModule {}
