import { Module } from '@nestjs/common';
import { EditMangaModule } from './manga/editManga.module';
import { EditRanobeModule } from './ranobe/editRanobe.module';
@Module({
    imports: [EditMangaModule, EditRanobeModule],
})
export class EditBookModule {}
