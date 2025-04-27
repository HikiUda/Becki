import { LangType } from 'src/common/dto/query/langQuery.dto';
import { ChapterPagesDto } from './chapterPages.scheme';

export type AllLangPagesType = Record<LangType, ChapterPagesDto | null>;
