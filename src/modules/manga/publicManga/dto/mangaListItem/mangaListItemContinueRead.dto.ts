import { MangaListItemBaseDto } from './mangaListItemBase.dto';

export type MangaListItemContinueReadDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'chapter' | 'chapterCount' | 'tome' | 'readedChapters' | 'cover'
>;
