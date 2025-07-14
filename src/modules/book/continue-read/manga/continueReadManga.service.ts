import { Injectable } from '@nestjs/common';
import { ContinueReadMangaRepository } from './continueReadManga.repository';
import { ContinueReadBookServiceInterface } from '../__common/interfaces/continueReadBookService';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookListQuery,
    ContinueReadBookList,
} from '../__common/dto/continueReadBookList.dto';
import { UserId } from 'src/modules/authorization';
import { MangaId } from '../../_common/model/bookId';
import { SetContinueReadMangaParams } from '../__common/dto/setContinueReadBookParams';

@Injectable()
export class ContinueReadMangaService implements ContinueReadBookServiceInterface {
    constructor(private repository: ContinueReadMangaRepository) {}

    async getContinueReadBookList(
        userId: UserId,
        query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        return await this.repository.getContinueReadBookList(userId, query);
    }

    async getContinueReadBook(userId: UserId | null, bookId: MangaId): Promise<ContinueReadBook> {
        return await this.repository.getContinueReadBook(userId, bookId);
    }

    async setContinueReadBook(userId: UserId, params: SetContinueReadMangaParams): Promise<void> {
        return await this.repository.setContinueReadBook(userId, params);
    }

    async dontShowContinueReadBook(userId: UserId, bookId: MangaId): Promise<void> {
        return await this.repository.dontShowContinueReadBook(userId, bookId);
    }
}
