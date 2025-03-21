import { Module } from '@nestjs/common';
import { EditMangaController } from './editManga.controller';
import { EditMangaRepository } from './editManga.repository';
import { EditMangaService } from './editManga.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { FileModule } from 'src/modules/file/file.module';

@Module({
    imports: [FileModule],
    controllers: [EditMangaController],
    providers: [EditMangaService, EditMangaRepository, PrismaService],
})
export class EditMangaModule {}
