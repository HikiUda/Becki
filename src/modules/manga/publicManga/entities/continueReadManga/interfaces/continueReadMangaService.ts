import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemContinueReadDto } from '../../../dto/mangaListItemContinueRead.dto';

export interface ContinueReadMangaServiceInterface {
    getContinueReadManga: (
        userId: number,
        lang: LangType,
    ) => Promise<MangaListItemContinueReadDto[]>;
    dontShowContinueReadManga: (userId: number, mangaId: number) => Promise<void>;
}
