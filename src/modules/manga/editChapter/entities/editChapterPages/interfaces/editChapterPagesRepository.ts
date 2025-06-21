import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ChapterPagesDto } from '../dto/chapterPages.scheme';
import { AllLangPagesType } from '../dto/allLangPages';

export interface EditChapterPagesRepositoryInterface {
    getChapterPages: (chapterId: number, lang: LangType) => Promise<ChapterPagesDto | null>;
    setChapterPages: (
        chapterId: number,
        pages: ChapterPagesDto,
        lang: LangType,
    ) => Promise<ChapterPagesDto>;
    addLangChapterPages: (chapterId: number, lang: LangType) => Promise<ChapterPagesDto>;
    deleteLangChapterPages: (chapterId: number, lang: LangType) => Promise<void>;
    getAllLangPages: (chapterId: number) => Promise<AllLangPagesType>;
}
