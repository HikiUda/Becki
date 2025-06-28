import { Module } from '@nestjs/common';
import { EditMangaModule } from './manga/editManga.module';
@Module({
    imports: [EditMangaModule],
})
export class EditBookModule {}
