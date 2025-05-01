import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { Pagination } from 'src/common/types/pagination';

export type MangaListItemLastUpdatedDto = Pick<
    MangaListItemBaseDto,
    | 'id'
    | 'urlId'
    | 'title'
    | 'type'
    | 'cover'
    | 'tome'
    | 'chapter'
    | 'chapterCreatedAt'
    | 'chapterId'
>;

export type MangaListItemLastUpdatedPagination = Pagination<MangaListItemLastUpdatedDto>;
