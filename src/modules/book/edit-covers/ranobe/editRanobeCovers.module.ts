import { Module } from '@nestjs/common';
import { FileModule } from 'src/modules/file/file.module';
import { EditRanobeCoversService } from './editRanobeCovers.service';
import { EditRanobeCoversRepository } from './editRanobeCovers.repository';
import { EditRanobeCoversController } from './editRanobeCovers.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [FileModule],
    controllers: [EditRanobeCoversController],
    providers: [EditRanobeCoversService, EditRanobeCoversRepository, PrismaService],
})
export class EditRanobeCoversModule {}
