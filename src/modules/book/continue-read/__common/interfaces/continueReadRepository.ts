import { LangType } from 'src/shared/dto/query/langQuery.dto';

export interface ContinueReadRepositoryInterface<T extends unknown[]> {
    getContinueReadBook: (userId: number, lang: LangType) => Promise<T>;
    dontShowContinueReadBook: (userId: number, bookId: number) => Promise<void>;
}
