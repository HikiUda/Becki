import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { AuthUserRequest } from 'src/modules/user/auth';
import { MangaListItemContinueReadResponseArrayData } from '../../../dto/mangaListItemContinueRead.dto';

export interface ContinueReadMangaControllerInterface {
    getContinueReadManga: (
        req: AuthUserRequest,
        query: LangQueryDto,
    ) => Promise<MangaListItemContinueReadResponseArrayData>;
    dontShowContinueReadManga: (req: AuthUserRequest, mangaId: number) => Promise<void>;
}
