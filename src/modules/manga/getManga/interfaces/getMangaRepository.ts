import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../../common/dto/manga.dto';

export interface GetMangaRepositoryInterface {
    getManga: (id: number, lang: LangType) => Promise<MangaDto>;
}
