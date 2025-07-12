import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepositoryInterface } from '../__common/interfaces/bookRepository';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { RanobeId } from 'src/modules/book/_common/model/bookId';
import { BookCover } from '../__common/dto/bookCovers.dto';
import { Ranobe } from './dto/ranobe.dto';
import { getBookSelect } from '../__common/prisma/getBookSelect';
import { getBookCategories } from '../__common/prisma/getBookCategories';
import { toBook } from '../__common/prisma/toBook';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class RanobeRepository implements BookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBook(bookId: RanobeId, lang: Lang): Promise<Ranobe> {
        const data = await this.prisma.ranobe.findUnique({
            where: { id: bookId },
            select: getBookSelect(),
        });
        if (!data) throw new NotFoundException('Такой ранобе не существует!');
        const categories = await getBookCategories(this.prisma, {
            genresIds: data.genres,
            tagsIds: data.tags,
            lang,
        });
        return toBook(data, categories);
    }

    async getBookCovers(bookId: RanobeId): Promise<BookCover[]> {
        return await this.prisma.ranobeCovers.findMany({
            where: { bookId },
            orderBy: { main: 'desc' },
            select: { id: true, cover: true },
        });
    }
}
