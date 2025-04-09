import { MangaListItemPagination } from '../../../dto/mangaListItem.dto';
import { MangaListItemLastUpdatedPagination } from '../../../dto/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../dto/lastUpdatedMangaQuery.dto';
import { MangaListQueryDto } from '../dto/getMangaListQuery';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemStatisticResponseArrayData } from '../../../dto/mangaListItemStatistic.dto';

export interface PublicMangaServiceInterface {
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
