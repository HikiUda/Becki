import { Injectable, NotFoundException } from '@nestjs/common';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { getEditedRanobeChapterList } from './prisma/getEditedChapterList';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EditBookChaptersRepositoryInterface } from '../__common/interfaces/editChapterRepository';
import { toEditedBookChapterList } from '../__common/prisma/toEditedBookChapterList';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { toEditedBookChapterDto } from '../__common/prisma/toEditedBookChapter';
import { getCreateChapterInput } from '../__common/prisma/getCreateChapterInput';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { getUpdateChapterInput } from '../__common/prisma/getUpdateChapterInput';
import { RanobeChapterId, RanobeId } from '../../_common/model/bookId';

@Injectable()
export class EditRanobeChaptersRepository implements EditBookChaptersRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedChapterList(
        bookId: RanobeId,
        query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        const data = await getEditedRanobeChapterList(this.prisma, bookId, query);
        return toEditedBookChapterList(data, query);
    }

    async getEditedChapter(
        bookId: RanobeId,
        chapterId: RanobeChapterId,
    ): Promise<EditedBookChapter> {
        const chapter = await this.prisma.ranobeChapters.findUnique({
            where: { id: chapterId, bookId },
        });
        if (!chapter) throw new NotFoundException('Такой Главы не существует!');
        return toEditedBookChapterDto(chapter);
    }

    async createChapter(bookId: RanobeId, data: MutateBookChapterDto): Promise<void> {
        await this.prisma.ranobeChapters.create({
            data: getCreateChapterInput(bookId, data),
        });
        return;
    }

    async updateChapter(
        bookId: RanobeId,
        chapterId: RanobeChapterId,
        data: MutateBookChapterDto,
    ): Promise<void> {
        await this.prisma.ranobeChapters.update({
            where: { id: chapterId, bookId },
            data: getUpdateChapterInput(data),
        });
        return;
    }

    async toggleChapterPublish(bookId: RanobeId, chapterId: RanobeChapterId): Promise<void> {
        const chapter = await this.prisma.ranobeChapters.findUnique({
            where: { id: chapterId },
            select: { publish: true },
        });
        if (!chapter) throw new NotFoundException('Такой главы не существует!');
        if (chapter.publish) {
            await this.prisma.ranobeStatistic.update({
                where: { bookId },
                data: { chapterCount: { decrement: 1 } },
            });
        } else {
            await this.prisma.ranobeStatistic.update({
                where: { bookId },
                data: { chapterCount: { increment: 1 } },
            });
        }
        await this.prisma.ranobeChapters.update({
            where: { id: chapterId, bookId },
            data: { publish: !chapter.publish },
        });
    }
}
