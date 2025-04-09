import { ResponseArrayData } from 'src/common/types/pagination';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';

export type MangaListItemContinueReadDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'chapter' | 'chapterCount' | 'tome' | 'readedChapters' | 'cover'
>;

export type MangaListItemContinueReadResponseArrayData =
    ResponseArrayData<MangaListItemContinueReadDto>;
