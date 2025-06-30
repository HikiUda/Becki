import { Injectable, NotFoundException } from '@nestjs/common';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { toEditedBook } from '../__common/prisma/toEditedBook';
import { getEditedBookCategories } from '../__common/prisma/getEditedBookCategories';
import { MutateRanobeDto } from './dto/mutateRanobe.dto';
import { EditedRanobe } from './dto/editedRanobe.dto';
import { EditBookRepositoryInterface } from '../__common/interfaces/editBookRepository';
import { getUpdateBookInput } from '../__common/prisma/getUpdateBookInput';
import { createBookInput } from '../__common/prisma/getCreateBookInput';

@Injectable()
export class EditRanobeRepository implements EditBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedBook(bookId: number, lang: LangType): Promise<EditedRanobe> {
        const data = await this.prisma.ranobe.findUnique({
            where: { id: bookId },
            include: {
                title: true,
                description: true,
            },
        });
        if (!data) throw new NotFoundException('Такого тайтла не существует.');
        const categories = await getEditedBookCategories(this.prisma, {
            genresIds: data.genres,
            tagsIds: data.tags,
            lang,
        });
        return toEditedBook(data, categories);
    }

    async createBook(data: MutateRanobeDto): Promise<number> {
        const { id } = await this.prisma.ranobe.create({ data: createBookInput(data) });
        return id;
    }

    async updateBook(data: MutateRanobeDto, bookId: number): Promise<void> {
        await this.prisma.ranobe.update({
            where: { id: bookId },
            data: getUpdateBookInput(data),
        });
        return;
    }

    async addCover(cover: string, bookId: number): Promise<void> {
        await this.prisma.ranobeCovers.create({
            data: {
                cover,
                main: true,
                bookId,
            },
        });
        return;
    }

    async getBookBanner(bookId: number): Promise<string | null> {
        const book = await this.prisma.ranobe.findUnique({
            where: { id: bookId },
            select: { banner: true },
        });
        if (!book) return null;
        return book.banner;
    }
}
