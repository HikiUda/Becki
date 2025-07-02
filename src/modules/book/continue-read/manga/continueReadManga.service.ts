import { Injectable } from '@nestjs/common';
import { ContinueReadMangaRepository } from './continueReadManga.repository';
import { ContinueReadBookServiceInterface } from '../__common/interfaces/continueReadBookService';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookListQuery,
    ContinueReadBookList,
} from '../__common/dto/continueReadBookList.dto';

@Injectable()
export class ContinueReadMangaService implements ContinueReadBookServiceInterface {
    constructor(private repository: ContinueReadMangaRepository) {}

    async getContinueReadBookList(
        userId: number,
        query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        return await this.repository.getContinueReadBookList(userId, query);
    }

    async getContinueReadBook(userId: number | null, bookId: number): Promise<ContinueReadBook> {
        return await this.repository.getContinueReadBook(userId, bookId);
    }

    async setContinueReadBook(
        userId: number,
        bookId: number,
        chapterId: number | null,
    ): Promise<void> {
        return await this.repository.setContinueReadBook(userId, bookId, chapterId);
    }

    async dontShowContinueReadBook(userId: number, bookId: number): Promise<void> {
        return await this.repository.dontShowContinueReadBook(userId, bookId);
    }
}
