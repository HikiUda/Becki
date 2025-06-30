import { Injectable, NotFoundException } from '@nestjs/common';
import { EditBookRepositoryInterface } from '../__common/interfaces/editBookRepository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EditedManga } from './dto/editedManga.dto';
import { toEditedBook } from '../__common/prisma/toEditedBook';
import { getEditedBookCategories } from '../__common/prisma/getEditedBookCategories';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { createBookInput } from '../__common/prisma/getCreateBookInput';
import { getUpdateBookInput } from '../__common/prisma/getUpdateBookInput';

@Injectable()
export class EditMangaRepository implements EditBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedBook(bookId: number, lang: LangType): Promise<EditedManga> {
        const data = await this.prisma.manga.findUnique({
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

    async createBook(data: MutateMangaDto): Promise<number> {
        const { id } = await this.prisma.manga.create({ data: createBookInput(data) });
        return id;
    }

    async updateBook(data: MutateMangaDto, bookId: number): Promise<void> {
        await this.prisma.manga.update({
            where: { id: bookId },
            data: getUpdateBookInput(data),
        });
        return;
    }

    async addCover(cover: string, bookId: number): Promise<void> {
        await this.prisma.mangaCovers.create({
            data: {
                cover,
                main: true,
                bookId,
            },
        });
        return;
    }

    async getBookBanner(bookId: number): Promise<string | null> {
        const book = await this.prisma.manga.findUnique({
            where: { id: bookId },
            select: { banner: true },
        });
        if (!book) return null;
        return book.banner;
    }
}
