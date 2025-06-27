import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ResponseArrayData } from 'src/shared/types/pagination';

export interface ContinueReadServiceInterface<T extends ResponseArrayData<unknown>> {
    getContinueReadBook: (userId: number, lang: LangType) => Promise<T>;
    dontShowContinueReadBook: (userId: number, bookId: number) => Promise<void>;
}
