import { Injectable, NotFoundException } from '@nestjs/common';
import {
    EditedBookChapterList,
    EditedBookChapterListQueryDto,
} from '../__common/dto/editedBookChapterList';
import { getEditedMangaChapterList } from './prisma/getEditedChapterList';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EditBookChaptersRepositoryInterface } from '../__common/interfaces/editChapterRepository';
import { toEditedBookChapterList } from '../__common/prisma/toEditedBookChapterList';
import { EditedBookChapterDto } from '../__common/dto/editedBookChapter.dto';
import { toEditedBookChapterDto } from '../__common/prisma/toEditedBookChapter';
import { getCreateChapterInput } from '../__common/prisma/getCreateChapterInput';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { getUpdateChapterInput } from '../__common/prisma/getUpdateChapterInput';

@Injectable()
export class EditMangaChaptersRepository implements EditBookChaptersRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedChapterList(
        bookId: number,
        query: EditedBookChapterListQueryDto,
    ): Promise<EditedBookChapterList> {
        const data = await getEditedMangaChapterList(this.prisma, bookId, query);
        return toEditedBookChapterList(data, query);
    }

    async getEditedChapter(bookId: number, chapterId: number): Promise<EditedBookChapterDto> {
        const chapter = await this.prisma.mangaChapters.findUnique({
            where: { id: chapterId, bookId },
            include: { title: true },
        });
        if (!chapter) throw new NotFoundException('Такой Главы не существует!');
        return toEditedBookChapterDto(chapter);
    }

    async createChapter(bookId: number, dto: MutateBookChapterDto): Promise<void> {
        await this.prisma.mangaChapters.create({
            data: getCreateChapterInput(bookId, dto),
        });
        await this.prisma.mangaStatistic.update({
            where: { bookId },
            data: { chapterCount: { increment: 1 } },
        });
        return;
    }

    async updateChapter(
        bookId: number,
        chapterId: number,
        dto: MutateBookChapterDto,
    ): Promise<void> {
        await this.prisma.mangaChapters.update({
            where: { id: chapterId, bookId },
            data: getUpdateChapterInput(dto),
        });
        return;
    }
}
