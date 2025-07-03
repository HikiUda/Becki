import { Injectable, NotFoundException } from '@nestjs/common';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { getEditedMangaChapterList } from './prisma/getEditedChapterList';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EditBookChaptersRepositoryInterface } from '../__common/interfaces/editChapterRepository';
import { toEditedBookChapterList } from '../__common/prisma/toEditedBookChapterList';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { toEditedBookChapterDto } from '../__common/prisma/toEditedBookChapter';
import { getCreateChapterInput } from '../__common/prisma/getCreateChapterInput';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { getUpdateChapterInput } from '../__common/prisma/getUpdateChapterInput';
import { MangaChapterId, MangaId } from '../../_common/model/bookId';

@Injectable()
export class EditMangaChaptersRepository implements EditBookChaptersRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedChapterList(
        bookId: MangaId,
        query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        const data = await getEditedMangaChapterList(this.prisma, bookId, query);
        return toEditedBookChapterList(data, query);
    }

    async getEditedChapter(bookId: MangaId, chapterId: MangaChapterId): Promise<EditedBookChapter> {
        const chapter = await this.prisma.mangaChapters.findUnique({
            where: { id: chapterId, bookId },
            include: { title: true },
        });
        if (!chapter) throw new NotFoundException('Такой Главы не существует!');
        return toEditedBookChapterDto(chapter);
    }

    async createChapter(bookId: MangaId, data: MutateBookChapterDto): Promise<void> {
        await this.prisma.mangaChapters.create({
            data: getCreateChapterInput(bookId, data),
        });
        return;
    }

    async updateChapter(
        bookId: MangaId,
        chapterId: MangaChapterId,
        data: MutateBookChapterDto,
    ): Promise<void> {
        await this.prisma.mangaChapters.update({
            where: { id: chapterId, bookId },
            data: getUpdateChapterInput(data),
        });
        return;
    }

    async toggleChapterPublish(bookId: MangaId, chapterId: MangaChapterId): Promise<void> {
        const chapter = await this.prisma.mangaChapters.findUnique({
            where: { id: chapterId },
            select: { publish: true },
        });
        if (!chapter) throw new NotFoundException('Такой главы не существует!');
        if (chapter.publish) {
            await this.prisma.mangaStatistic.update({
                where: { bookId },
                data: { chapterCount: { decrement: 1 } },
            });
        } else {
            await this.prisma.mangaStatistic.update({
                where: { bookId },
                data: { chapterCount: { increment: 1 } },
            });
        }
        await this.prisma.mangaChapters.update({
            where: { id: chapterId, bookId },
            data: { publish: !chapter.publish },
        });
    }
}
