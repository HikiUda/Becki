import { Injectable } from '@nestjs/common';
import { EditBookChaptersServiceInterface } from '../__common/interfaces/editChapterService';
import { EditMangaChaptersRepository } from './editMangaChapters.repository';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';

@Injectable()
export class EditMangaChaptersService implements EditBookChaptersServiceInterface {
    constructor(private repository: EditMangaChaptersRepository) {}
    async getEditedChapterList(
        bookId: number,
        query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.repository.getEditedChapterList(bookId, query);
    }

    async getEditedChapter(bookId: number, chapterId: number): Promise<EditedBookChapter> {
        return await this.repository.getEditedChapter(bookId, chapterId);
    }

    async createChapter(bookId: number, data: MutateBookChapterDto): Promise<void> {
        return await this.repository.createChapter(bookId, data);
    }

    async updateChapter(
        bookId: number,
        chapterId: number,
        data: MutateBookChapterDto,
    ): Promise<void> {
        return await this.repository.updateChapter(bookId, chapterId, data);
    }

    async toggleChapterPublish(bookId: number, chapterId: number): Promise<void> {
        await this.repository.toggleChapterPublish(bookId, chapterId);
        return;
    }
}
