import { Module } from '@nestjs/common';
import { FileModule } from 'src/modules/file/file.module';
import { EditMangaChaptersPagesController } from './editMangaChaptersPages.controller';
import { EditMangaChaptersPagesService } from './editMangaChaptersPages.service';
import { EditMangaChaptersPagesRepository } from './editMangaChaptersPages.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [FileModule],
    controllers: [EditMangaChaptersPagesController],
    providers: [EditMangaChaptersPagesService, EditMangaChaptersPagesRepository, PrismaService],
})
export class EditMangaChaptersPagesModule {}
