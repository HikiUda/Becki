import { MangaChapterParams } from '../../_common/model/bookId';
import { MangaChapterPages } from '../../_common/model/mangaChapterPages';
import { AddPageResponse } from '../dto/addPageResponse.dto';
import { DeleteMangaChapterPage } from '../dto/deleteMangaChapterPage.dto';

export interface EditMangaChaptersPagesControllerInterface {
    getPages: (params: MangaChapterParams) => Promise<MangaChapterPages>;
    addPage: (params: MangaChapterParams, page: Express.Multer.File) => Promise<AddPageResponse>;
    updatePages: (params: MangaChapterParams, body: MangaChapterPages) => Promise<void>;
    deletePage: (params: MangaChapterParams, body: DeleteMangaChapterPage) => Promise<void>;
}
