import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaListItemDto, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQueryDto,
} from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';

export interface PublicMangaRepositoryInterface {
    getMangaList: (query: MangaListQuery, lang: LangType) => Promise<MangaListItemDto[]>;
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
