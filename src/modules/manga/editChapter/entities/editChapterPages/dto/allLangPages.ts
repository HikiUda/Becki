import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ChapterPagesDto } from './chapterPages.scheme';

export type AllLangPagesType = Record<LangType, ChapterPagesDto | null>;
