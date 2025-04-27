import { Injectable } from '@nestjs/common';
import { EditChapterServiceInterface } from './interfaces/editChapterService';
import { EditChapterRepository } from './editChapter.repository';
import { EditedChpaterDto } from './dto/editedChapter.dto';
import { MutateChapterDto } from './dto/mutateChapter.dto';
import { EditChapterPagesService } from '../editChapterPages/editChapterPages.service';
import { FileService } from 'src/modules/file/file.service';

@Injectable()
export class EditChapterService implements EditChapterServiceInterface {
    constructor(
        private editChapterRepository: EditChapterRepository,
        private editChapterPagesService: EditChapterPagesService,
        private fileService: FileService,
    ) {}
    async getEditedChapter(chapterId: number): Promise<EditedChpaterDto> {
        return await this.editChapterRepository.getEditedChapter(chapterId);
    }
    async createChapter(mangaId: number, data: MutateChapterDto): Promise<EditedChpaterDto> {
        return await this.editChapterRepository.createChapter(mangaId, data);
    }
    async updateChapter(chapterId: number, data: MutateChapterDto): Promise<EditedChpaterDto> {
        return await this.editChapterRepository.updateChapter(chapterId, data);
    }
    async deleteChapter(chapterId: number): Promise<void> {
        const allPages = await this.editChapterPagesService.getAllLangPages(chapterId);
        let deletePages: string[] = [];
        Object.values(allPages).forEach((pages) => {
            if (!pages) return;
            deletePages = deletePages.concat(
                pages.pages.filter((page) => page.type === 'image').map((page) => page.src),
            );
        });
        await this.fileService.deleteFiles(deletePages);
        await this.editChapterRepository.deleteChapter(chapterId);
    }
}
