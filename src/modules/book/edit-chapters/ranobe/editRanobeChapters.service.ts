import { Injectable } from '@nestjs/common';
import { EditBookChaptersServiceInterface } from '../__common/interfaces/editChapterService';
import { EditRanobeChaptersRepository } from './editRanobeChapters.repository';
import {
    EditedBookChapterList,
    EditedBookChapterListQueryDto,
} from '../__common/dto/editedBookChapterList';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditedBookChapterDto } from '../__common/dto/editedBookChapter.dto';

@Injectable()
export class EditRanobeChaptersService implements EditBookChaptersServiceInterface {
    constructor(private repository: EditRanobeChaptersRepository) {}
    async getEditedChapterList(
        bookId: number,
        query: EditedBookChapterListQueryDto,
    ): Promise<EditedBookChapterList> {
        return await this.repository.getEditedChapterList(bookId, query);
    }

    async getEditedChapter(bookId: number, chapterId: number): Promise<EditedBookChapterDto> {
        return await this.repository.getEditedChapter(bookId, chapterId);
    }

    async createChapter(bookId: number, dto: MutateBookChapterDto): Promise<void> {
        return await this.repository.createChapter(bookId, dto);
    }

    async updateChapter(
        bookId: number,
        chapterId: number,
        dto: MutateBookChapterDto,
    ): Promise<void> {
        return await this.repository.updateChapter(bookId, chapterId, dto);
    }
}
