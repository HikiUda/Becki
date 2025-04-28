import { BadRequestException, Injectable } from '@nestjs/common';
import { EditChapterRepositoryInterface } from './interfaces/editChapterRepository';
import { EditedChpaterDto } from './dto/editedChapter.dto';
import { getEditedChapter, toEditedChapterDto } from './prisma/getEditedChapter';
import { MutateChapterDto } from './dto/mutateChapter.dto';
import { createChapter } from './prisma/mutateChapter/createChapter';
import { updateChapter } from './prisma/mutateChapter/updateChapter';
import { deleteChapter } from './prisma/mutateChapter/deleteChapter';
import { EditedChapterListPagination, EditedChapterListQuery } from './dto/editedChapterList';
import { getEditedChapterList, toEditedChapterListItemDto } from './prisma/getEditedChapterList';
import { getPagination } from 'src/common/helpers/pagination/getPagination';

@Injectable()
export class EditChapterRepository implements EditChapterRepositoryInterface {
    constructor() {}
    async getEditedChapter(chapterId: number): Promise<EditedChpaterDto> {
        const data = await getEditedChapter(chapterId);
        if (!data) throw new BadRequestException('Такой главы не существует');
        return toEditedChapterDto(data);
    }
    async getEditedChapterList(
        mangaId: number,
        query: EditedChapterListQuery,
    ): Promise<EditedChapterListPagination> {
        const data = await getEditedChapterList(mangaId, query);
        const dto = toEditedChapterListItemDto(data.data, query.lang);
        return {
            data: dto,
            ...getPagination(data.chapterCount, query.page, query.limit),
        };
    }

    async createChapter(mangaId: number, data: MutateChapterDto): Promise<EditedChpaterDto> {
        const chapter = await createChapter(mangaId, data);
        return await this.getEditedChapter(chapter.id);
    }
    async updateChapter(chapterId: number, data: MutateChapterDto): Promise<EditedChpaterDto> {
        await updateChapter(chapterId, data);
        return await this.getEditedChapter(chapterId);
    }

    async deleteChapter(chapterId: number): Promise<void> {
        await deleteChapter(chapterId);
    }
}
