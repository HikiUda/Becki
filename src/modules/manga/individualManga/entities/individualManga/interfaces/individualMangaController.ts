import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { MangaDto } from '../dto/manga.dto';

import { OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';
import { MangaCoverArrayData } from '../dto/mangaCovers.dto';

export interface IndividualMangaControllerInterface {
    getManga: (req: OptionalAuthUserRequest, id: number, query: LangQueryDto) => Promise<MangaDto>;
    getMangaCovers: (id: number) => Promise<MangaCoverArrayData>;
}
