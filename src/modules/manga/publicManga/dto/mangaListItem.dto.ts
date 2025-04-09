import { Pagination } from 'src/common/types/pagination';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';

export type MangaListItemDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'chapterCount' | 'bookmark' | 'rate' | 'cover' | 'type'
>;
export type MangaListItemPagination = Pagination<MangaListItemDto>;
