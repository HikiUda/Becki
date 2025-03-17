import { Module } from '@nestjs/common';
import { GetMangaModule } from './getManga/getManga.module';
import { MutateMangaModule } from './mutateManga/mutateManga.module';

@Module({
    imports: [GetMangaModule, MutateMangaModule],
})
export class MangaModule {}
