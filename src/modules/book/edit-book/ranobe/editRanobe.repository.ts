import { Injectable, NotFoundException } from '@nestjs/common';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { toEditedBook } from '../__common/prisma/toEditedBook';
import { getEditedBookCategories } from '../__common/prisma/getEditedBookCategories';
import { MutateRanobeDto } from './dto/mutateRanobe.dto';
import { EditedRanobe } from './dto/editedRanobe.dto';
import { EditBookRepositoryInterface } from '../__common/interfaces/editBookRepository';
import { getUpdateBookInput } from '../__common/prisma/getUpdateBookInput';
import { createBookInput } from '../__common/prisma/getCreateBookInput';
import { RanobeId } from '../../_common/model/bookId';
import { getEditedBookIncludeInput } from '../__common/prisma/getEditedBookIncludeInput';

@Injectable()
export class EditRanobeRepository implements EditBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedBook(bookId: RanobeId, lang: Lang): Promise<EditedRanobe> {
        const data = await this.prisma.ranobe.findUnique({
            where: { id: bookId },
            include: getEditedBookIncludeInput(),
        });
        if (!data) throw new NotFoundException('Такого тайтла не существует.');
        const categories = await getEditedBookCategories(this.prisma, {
            genresIds: data.genres,
            tagsIds: data.tags,
            lang,
        });
        return toEditedBook(data, categories);
    }

    async createBook(data: MutateRanobeDto): Promise<RanobeId> {
        const { id } = await this.prisma.ranobe.create({ data: createBookInput(data) });
        return id as RanobeId;
    }

    async updateBook(data: MutateRanobeDto, bookId: RanobeId): Promise<void> {
        await this.prisma.ranobe.update({
            where: { id: bookId },
            data: getUpdateBookInput(data),
        });
        return;
    }

    async addCover(cover: string, bookId: RanobeId): Promise<void> {
        await this.prisma.ranobeCovers.create({
            data: {
                cover,
                main: true,
                bookId,
            },
        });
        return;
    }

    async getBookBanner(bookId: RanobeId): Promise<string | null> {
        const book = await this.prisma.ranobe.findUnique({
            where: { id: bookId },
            select: { banner: true },
        });
        if (!book) return null;
        return book.banner;
    }
}
