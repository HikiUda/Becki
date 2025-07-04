import { Injectable } from '@nestjs/common';
import { BookServiceInterface } from '../__common/interfaces/bookService';
import { MangaRepository } from './manga.repository';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { MangaId } from '../../_common/model/bookId';
import { BookCoverList } from '../__common/dto/bookCovers.dto';
import { Manga } from './dto/manga.dto';

@Injectable()
export class MangaService implements BookServiceInterface {
    constructor(private repository: MangaRepository) {}

    async getBook(bookId: MangaId, lang: Lang): Promise<Manga> {
        return this.repository.getBook(bookId, lang);
    }

    async getBookCovers(bookId: MangaId): Promise<BookCoverList> {
        const data = await this.repository.getBookCovers(bookId);
        return { data };
    }
}
