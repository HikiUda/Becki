import { Injectable } from '@nestjs/common';
import { EditBookChaptersServiceInterface } from '../__common/interfaces/editChapterService';
import { EditMangaChaptersRepository } from './editMangaChapters.repository';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { MangaChapterId, MangaId } from '../../_common/model/bookId';

@Injectable()
export class EditMangaChaptersService implements EditBookChaptersServiceInterface {
    constructor(private repository: EditMangaChaptersRepository) {}
    async getEditedChapterList(
        bookId: MangaId,
        query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.repository.getEditedChapterList(bookId, query);
    }

    async getEditedChapter(bookId: MangaId, chapterId: MangaChapterId): Promise<EditedBookChapter> {
        return await this.repository.getEditedChapter(bookId, chapterId);
    }

    async createChapter(bookId: MangaId, data: MutateBookChapterDto): Promise<void> {
        return await this.repository.createChapter(bookId, data);
    }

    async updateChapter(
        bookId: MangaId,
        chapterId: MangaChapterId,
        data: MutateBookChapterDto,
    ): Promise<void> {
        return await this.repository.updateChapter(bookId, chapterId, data);
    }

    async toggleChapterPublish(bookId: MangaId, chapterId: MangaChapterId): Promise<void> {
        await this.repository.toggleChapterPublish(bookId, chapterId);
        return;
    }
}
