import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ContinueReadBookList } from '../dto/continueReadBook.dto';

export interface ContinueReadBookServiceInterface {
    getContinueReadBooks: (userId: number, lang: LangType) => Promise<ContinueReadBookList>;
    setContinueReadBook: (userId: number, bookId: number, chapterId: number) => Promise<void>;
    dontShowContinueReadBook: (userId: number, bookId: number) => Promise<void>;
}
