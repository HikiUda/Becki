import { MangaListItemPagination } from '../../../dto/mangaListItem.dto';
import { MangaListQueryDto } from '../dto/getMangaListQuery/getMangaListQuery.dto';
import { MangaListItemLastUpdatedPagination } from '../../../dto/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../dto/lastUpdatedMangaQuery.dto';
import { MangaListItemStatisticResponseArrayData } from '../../../dto/mangaListItemStatistic.dto';
import { LangType } from 'src/common/dto/query/langQuery.dto';

export interface PublicMangaRepositoryInterface {
    getMangaList: (query: MangaListQueryDto, userId?: number) => Promise<MangaListItemPagination>;
    getLastUpdatedMangas: (
        query: MangaListItemLastUpdatedQueryDto,
        userId?: number,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getRelatedManga: (
        mangaId: number,
        lang: LangType,
    ) => Promise<MangaListItemStatisticResponseArrayData>;
}
