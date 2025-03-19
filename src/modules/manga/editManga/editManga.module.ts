import { Module } from '@nestjs/common';
import { EditMangaController } from './editManga.controller';
import { EditMangaRepository } from './editManga.repository';
import { EditMangaService } from './editManga.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
    controllers: [EditMangaController],
    providers: [EditMangaService, EditMangaRepository, PrismaService],
})
export class EditMangaModule {}
