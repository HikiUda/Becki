import { LangType } from 'src/common/dto/query/langQuery.dto';
import { ChapterPagesDto } from '../dto/chapterPages.scheme';
import { AllLangPagesType } from '../dto/allLangPages';

export interface EditChapterPagesServiceInterface {
    getChapterPages: (chapterId: number, lang: LangType) => Promise<ChapterPagesDto>;
    setChapterPages: (
        chapterId: number,
        pages: ChapterPagesDto,
        lang: LangType,
    ) => Promise<ChapterPagesDto>;
    addLangChapterPages: (chapterId: number, lang: LangType) => Promise<ChapterPagesDto>;
    deleteLangChapterPages: (chapterId: number, lang: LangType) => Promise<void>;
    addPage: (
        mangaId: number,
        chapterId: number,
        page: Express.Multer.File,
        lang: LangType,
    ) => Promise<ChapterPagesDto>;
    deletePage: (chapterId: number, pageSrc: string, lang: LangType) => Promise<void>;
    getAllLangPages: (chapterId: number) => Promise<AllLangPagesType>;
}
