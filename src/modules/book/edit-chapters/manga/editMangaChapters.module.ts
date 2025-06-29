import { Module } from '@nestjs/common';
import { EditMangaChaptersController } from './editMangaChapters.controller';
import { EditMangaChaptersService } from './editMangaChapters.service';
import { EditMangaChaptersRepository } from './editMangaChapters.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [EditMangaChaptersController],
    providers: [EditMangaChaptersService, EditMangaChaptersRepository, PrismaService],
})
export class EditMangaChaptersModule {}
