import { Module } from '@nestjs/common';
import { FileModule } from 'src/modules/file/file.module';
import { EditMangaController } from './editManga.controller';
import { EditMangaService } from './editManga.service';
import { EditMangaRepository } from './editManga.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [FileModule],
    controllers: [EditMangaController],
    providers: [EditMangaService, EditMangaRepository, PrismaService],
})
export class EditMangaModule {}
