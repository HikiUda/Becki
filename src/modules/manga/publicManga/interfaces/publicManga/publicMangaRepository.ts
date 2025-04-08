import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemPagination } from '../../dto/mangaListItem/mangaListItem.dto';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery/getMangaListQuery.dto';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/publicManga/lastUpdatedMangaQuery.dto';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';

export interface PublicMangaRepositoryInterface {
    getMangaList: (query: MangaListQueryDto, userId?: number) => Promise<MangaListItemPagination>;
    getLastUpdatedMangas: (
        query: MangaListItemLastUpdatedQueryDto,
        userId?: number,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getContinueReadManga: (
        userId: number,
        lang: LangType,
    ) => Promise<MangaListItemContinueReadDto[]>;
    dontShowContinueReadManga: (userId: number, mangaId: number) => Promise<void>;
}
