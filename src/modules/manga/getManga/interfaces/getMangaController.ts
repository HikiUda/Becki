import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../../common/dto/manga.dto';

export interface GetMangaControllerInterface {
    getManga: (params: { id: string }, query: { lang: LangType }) => Promise<MangaDto>;
}
