import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaDto } from '../dto/manga.dto';

export interface IndividualMangaRepositoryInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
}
