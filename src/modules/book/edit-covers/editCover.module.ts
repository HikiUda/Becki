import { Module } from '@nestjs/common';
import { EditMangaCoversModule } from './manga/editMangaCovers.module';
import { EditRanobeCoversModule } from './ranobe/editRanobeCovers.module';

@Module({
    imports: [EditMangaCoversModule, EditRanobeCoversModule],
})
export class EditBookCoversModule {}
