import { MangaChapterParams } from '../../_common/model/bookId';
import { MangaChapterPages } from '../../_common/model/mangaChapterPages';

export interface EditMangaChaptersPagesRepositoryInterface {
    getPages: (params: MangaChapterParams) => Promise<MangaChapterPages>;
    setPages: (params: MangaChapterParams, data: MangaChapterPages) => Promise<void>;
}
