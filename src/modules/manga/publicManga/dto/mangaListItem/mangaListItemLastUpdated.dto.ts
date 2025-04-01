import { LangType } from 'src/common/types/lang';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { Pagination } from 'src/common/types/pagination';

export type MangaListItemLastUpdatedScope = 'all' | 'popular' | 'my';
export interface MangaListItemLastUpdatedQuery {
    scope: MangaListItemLastUpdatedScope;
    lang: LangType;
    page: number;
    limit: number;
}

export type MangaListItemLastUpdatedDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'type' | 'cover' | 'tome' | 'chapter' | 'chapterCreatedAt'
>;

export type MangaListItemLastUpdatedPagination = Pagination<MangaListItemLastUpdatedDto>;
