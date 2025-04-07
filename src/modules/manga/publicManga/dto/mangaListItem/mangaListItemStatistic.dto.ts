import { ResponseArrayData } from 'src/common/types/pagination';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';

export type MangaListItemStatisticDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'type' | 'cover' | 'views' | 'likes' | 'bookmarks'
>;

export type MangaListItemStatisticResponseArrayData = ResponseArrayData<MangaListItemStatisticDto>;
