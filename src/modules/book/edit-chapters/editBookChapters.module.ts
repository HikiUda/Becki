//TODO delete chapters
import { Module } from '@nestjs/common';
import { EditMangaChaptersModule } from './manga/editMangaChapters.module';
import { EditRanobeChaptersModule } from './ranobe/editRanobeChapters.module';

@Module({
    imports: [EditMangaChaptersModule, EditRanobeChaptersModule],
})
export class EditBookChaptersModule {}
