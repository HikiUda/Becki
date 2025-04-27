import { Module } from '@nestjs/common';
import { EditChapterController } from './entities/editChapter/editChapter.controller';
import { EditChapterService } from './entities/editChapter/editChapter.service';
import { EditChapterRepository } from './entities/editChapter/editChapter.repository';
import { EditChapterPagesModule } from './entities/editChapterPages/editChapterPages.module';
import { FileModule } from 'src/modules/file/file.module';

@Module({
    imports: [EditChapterPagesModule, FileModule],
    controllers: [EditChapterController],
    providers: [EditChapterService, EditChapterRepository],
})
export class EditChapterModule {}
