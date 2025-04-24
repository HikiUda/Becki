import { Module } from '@nestjs/common';
import { EditMangaController } from './entities/editManga/editManga.controller';
import { EditMangaRepository } from './entities/editManga/editManga.repository';
import { EditMangaService } from './entities/editManga/editManga.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { FileModule } from 'src/modules/file/file.module';
import { EditMangaCoverModule } from './entities/editMangaCover/editMangaCover.module';
import { EditMangaCoverService } from './entities/editMangaCover/editMangaCover.service';

@Module({
    imports: [FileModule, EditMangaCoverModule],
    controllers: [EditMangaController],
    providers: [EditMangaService, EditMangaRepository, PrismaService],
})
export class EditMangaModule {}
