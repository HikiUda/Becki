import { Module } from '@nestjs/common';
import { EditMangaCoverController } from './editMangaCover.controller';
import { EditMangaCoverRepository } from './editMangaCover.repository';
import { EditMangaCoverService } from './editMangaCover.service';
import { FileModule } from 'src/modules/file/file.module';

@Module({
    imports: [FileModule],
    controllers: [EditMangaCoverController],
    providers: [EditMangaCoverService, EditMangaCoverRepository],
    exports: [EditMangaCoverService],
})
export class EditMangaCoverModule {}
