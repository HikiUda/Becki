import { Injectable } from '@nestjs/common';
import { BookServiceInterface } from '../__common/interfaces/bookService';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { RanobeId } from '../../_common/model/bookId';
import { BookCoverList } from '../__common/dto/bookCovers.dto';
import { Ranobe } from './dto/ranobe.dto';
import { RanobeRepository } from './ranobe.repository';

@Injectable()
export class RanobeService implements BookServiceInterface {
    constructor(private repository: RanobeRepository) {}

    async getBook(bookId: RanobeId, lang: Lang): Promise<Ranobe> {
        return this.repository.getBook(bookId, lang);
    }

    async getBookCovers(bookId: RanobeId): Promise<BookCoverList> {
        const data = await this.repository.getBookCovers(bookId);
        return { data };
    }
}
