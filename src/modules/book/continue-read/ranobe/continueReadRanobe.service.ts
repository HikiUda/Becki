import { Injectable } from '@nestjs/common';
import { ContinueReadRanobeRepository } from './continueReadRanobe.repository';
import { ContinueReadBookServiceInterface } from '../__common/interfaces/continueReadBookService';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookListQuery,
    ContinueReadBookList,
} from '../__common/dto/continueReadBookList.dto';
import { UserId } from 'src/modules/user/auth';
import { RanobeId } from '../../_common/model/bookId';
import { SetContinueReadRanobeParams } from '../__common/dto/setContinueReadBookParams';

@Injectable()
export class ContinueReadRanobeService implements ContinueReadBookServiceInterface {
    constructor(private repository: ContinueReadRanobeRepository) {}

    async getContinueReadBookList(
        userId: UserId,
        query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        return await this.repository.getContinueReadBookList(userId, query);
    }

    async getContinueReadBook(userId: UserId | null, bookId: RanobeId): Promise<ContinueReadBook> {
        return await this.repository.getContinueReadBook(userId, bookId);
    }

    async setContinueReadBook(userId: UserId, params: SetContinueReadRanobeParams): Promise<void> {
        return await this.repository.setContinueReadBook(userId, params);
    }

    async dontShowContinueReadBook(userId: UserId, bookId: RanobeId): Promise<void> {
        return await this.repository.dontShowContinueReadBook(userId, bookId);
    }
}
