import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';

export interface ContinueReadBookRepositoryInterface {
    getContinueReadBookList: (userId: number, lang: LangType) => Promise<ContinueReadBook[]>;
    setContinueReadBook: (userId: number, bookId: number, chapterId: number) => Promise<void>;
    dontShowContinueReadBook: (userId: number, bookId: number) => Promise<void>;
}
