import { Module } from '@nestjs/common';
import { FileModule } from 'src/modules/file/file.module';
import { EditRanobeService } from './editRanobe.service';
import { EditRanobeRepository } from './editRanobe.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EditRanobeController } from './editRanobe.controller';

@Module({
    imports: [FileModule],
    controllers: [EditRanobeController],
    providers: [EditRanobeService, EditRanobeRepository, PrismaService],
})
export class EditRanobeModule {}
