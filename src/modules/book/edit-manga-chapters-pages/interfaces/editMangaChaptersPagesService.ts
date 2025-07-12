import { MangaChapterParams } from '../../_common/model/bookId';
import { MangaChapterPages } from '../../_common/model/mangaChapterPages';

export interface EditMangaChaptersPagesServiceInterface {
    getPages: (params: MangaChapterParams) => Promise<MangaChapterPages>;
    addPage: (params: MangaChapterParams, page: Express.Multer.File) => Promise<string>;
    updatePages: (params: MangaChapterParams, data: MangaChapterPages) => Promise<void>;
    deletePage: (params: MangaChapterParams, page: string) => Promise<void>;
}
