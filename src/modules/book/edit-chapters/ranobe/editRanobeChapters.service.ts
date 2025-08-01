import { Injectable } from '@nestjs/common';
import { EditBookChaptersServiceInterface } from '../__common/interfaces/editChapterService';
import { EditRanobeChaptersRepository } from './editRanobeChapters.repository';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { RanobeChapterId, RanobeId } from '../../_common/model/bookId';

@Injectable()
export class EditRanobeChaptersService implements EditBookChaptersServiceInterface {
    constructor(private repository: EditRanobeChaptersRepository) {}
    async getEditedChapterList(
        bookId: RanobeId,
        query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.repository.getEditedChapterList(bookId, query);
    }

    async getEditedChapter(
        bookId: RanobeId,
        chapterId: RanobeChapterId,
    ): Promise<EditedBookChapter> {
        return await this.repository.getEditedChapter(bookId, chapterId);
    }

    async createChapter(bookId: RanobeId, data: MutateBookChapterDto): Promise<void> {
        return await this.repository.createChapter(bookId, data);
    }

    async updateChapter(
        bookId: RanobeId,
        chapterId: RanobeChapterId,
        data: MutateBookChapterDto,
    ): Promise<void> {
        return await this.repository.updateChapter(bookId, chapterId, data);
    }

    async toggleChapterPublish(bookId: RanobeId, chapterId: RanobeChapterId): Promise<void> {
        await this.repository.toggleChapterPublish(bookId, chapterId);
        return;
    }
}
