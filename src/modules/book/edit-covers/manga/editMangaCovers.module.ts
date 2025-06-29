import { Module } from '@nestjs/common';
import { FileModule } from 'src/modules/file/file.module';
import { EditMangaCoversService } from './editMangaCovers.service';
import { EditMangaCoversRepository } from './editMangaCovers.repository';
import { EditMangaCoversController } from './editMangaCovers.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [FileModule],
    controllers: [EditMangaCoversController],
    providers: [EditMangaCoversService, EditMangaCoversRepository, PrismaService],
})
export class EditMangaCoversModule {}
