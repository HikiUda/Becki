import { Module } from '@nestjs/common';
import { EditChapterPagesController } from './editChapterPages.controller';
import { EditChapterPagesRepository } from './editChapterPages.repository';
import { EditChapterPagesService } from './editChapterPages.service';
import { FileModule } from 'src/modules/file/file.module';

@Module({
    imports: [FileModule],
    controllers: [EditChapterPagesController],
    providers: [EditChapterPagesService, EditChapterPagesRepository],
    exports: [EditChapterPagesService],
})
export class EditChapterPagesModule {}
