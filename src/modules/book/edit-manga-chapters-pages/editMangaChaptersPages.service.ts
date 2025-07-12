import { Injectable } from '@nestjs/common';
import { EditMangaChaptersPagesServiceInterface } from './interfaces/editMangaChaptersPagesService';
import { EditMangaChaptersPagesRepository } from './editMangaChaptersPages.repository';
import { MangaFileService } from 'src/modules/file/services/mangaFile.service';
import { MangaChapterParams } from '../_common/model/bookId';
import {
    isMangaChapterPagesNestedArray,
    MangaChapterPages,
} from '../_common/model/mangaChapterPages';

@Injectable()
export class EditMangaChaptersPagesService implements EditMangaChaptersPagesServiceInterface {
    constructor(
        private repository: EditMangaChaptersPagesRepository,
        private fileService: MangaFileService,
    ) {}

    async getPages(params: MangaChapterParams): Promise<MangaChapterPages> {
        return await this.repository.getPages(params);
    }

    async addPage(params: MangaChapterParams, page: Express.Multer.File): Promise<string> {
        const { pages, pageCount, view } = await this.repository.getPages(params);
        const savedPage = await this.fileService.saveChapterPage({ page, ...params });

        if (!isMangaChapterPagesNestedArray(pages)) {
            await this.repository.setPages(params, {
                view,
                pageCount: pageCount + 1,
                pages: [...pages, savedPage],
            });
        } else {
            const lastArray = [...pages[pages.length - 1], savedPage];
            await this.repository.setPages(params, {
                view,
                pageCount: pageCount + 1,
                pages: [...pages.slice(0, -1), lastArray],
            });
        }

        return savedPage;
    }

    async updatePages(params: MangaChapterParams, data: MangaChapterPages): Promise<void> {
        await this.repository.setPages(params, data);
        return;
    }

    async deletePage(params: MangaChapterParams, page: string): Promise<void> {
        const { pages, pageCount, view } = await this.repository.getPages(params);
        await this.fileService.deleteFiles([page]);

        if (!isMangaChapterPagesNestedArray(pages)) {
            await this.repository.setPages(params, {
                view,
                pageCount: pageCount - 1,
                pages: pages.filter((p) => p !== page),
            });
        } else {
            const index = pages.findIndex((group) => group.find((p) => p === page));
            const newPages = [
                ...pages.slice(0, index),
                pages[index].filter((p) => p !== page),
                ...pages.slice(index + 1),
            ].filter((group) => group.length !== 0);

            await this.repository.setPages(params, {
                view,
                pageCount: pageCount - 1,
                pages: newPages.length < 2 ? newPages.flat() : newPages,
            });
        }

        return;
    }
}
