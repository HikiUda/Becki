import { BadRequestException, Injectable } from '@nestjs/common';
import { EditChapterPagesServiceInterface } from './interfaces/editChapterPagesService';
import { EditChapterPagesRepository } from './editChapterPages.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ChapterPagesDto, ChapterPageType } from './dto/chapterPages.scheme';
import { FileService } from 'src/modules/file/file.service';
import { AllLangPagesType } from './dto/allLangPages';

@Injectable()
export class EditChapterPagesService implements EditChapterPagesServiceInterface {
    constructor(
        private editChapterPagesRepository: EditChapterPagesRepository,
        private fileService: FileService,
    ) {}

    async getChapterPages(chapterId: number, lang: LangType): Promise<ChapterPagesDto> {
        const data = await this.editChapterPagesRepository.getChapterPages(chapterId, lang);
        if (!data) throw new BadRequestException('Такой локализации главы не существует');
        return data;
    }
    async setChapterPages(
        chapterId: number,
        pages: ChapterPagesDto,
        lang: LangType,
    ): Promise<ChapterPagesDto> {
        return await this.editChapterPagesRepository.setChapterPages(chapterId, pages, lang);
    }
    async addLangChapterPages(chapterId: number, lang: LangType): Promise<ChapterPagesDto> {
        const data = await this.editChapterPagesRepository.getChapterPages(chapterId, lang);
        if (data) throw new BadRequestException('Такая локализация уже существует');
        return await this.editChapterPagesRepository.addLangChapterPages(chapterId, lang);
    }
    async deleteLangChapterPages(chapterId: number, lang: LangType): Promise<void> {
        await this.editChapterPagesRepository.deleteLangChapterPages(chapterId, lang);
    }
    async addPage(
        mangaId: number,
        chapterId: number,
        page: Express.Multer.File,
        lang: LangType,
    ): Promise<ChapterPagesDto> {
        const data = await this.editChapterPagesRepository.getChapterPages(chapterId, lang);
        if (!data) throw new BadRequestException('Такой локализации главы не существует');
        const { pages, pageCount, containerMaxWidth } = data;
        const savedPage = await this.fileService.saveChapterPage(page, mangaId, chapterId, lang);
        const newPage: ChapterPageType = {
            src: savedPage.url,

            type: 'image',
        };
        return await this.editChapterPagesRepository.setChapterPages(
            chapterId,
            { pageCount: pageCount + 1, pages: pages.concat([newPage]), containerMaxWidth },
            lang,
        );
    }
    async deletePage(chapterId: number, pageSrc: string, lang: LangType): Promise<void> {
        const data = await this.editChapterPagesRepository.getChapterPages(chapterId, lang);
        if (!data) throw new BadRequestException('Такой локализации главы не существует');
        const { pages, pageCount, containerMaxWidth } = data;
        const pageIndex = pages.findIndex((page) => page.src === pageSrc);
        if (pageIndex === -1) throw new BadRequestException('Такой страницы не существует');

        if (pages[pageIndex].type === 'image') await this.fileService.deleteFiles([pageSrc]);

        const newPages = pages.slice(0, pageIndex).concat(pages.slice(pageIndex + 1));

        await this.editChapterPagesRepository.setChapterPages(
            chapterId,
            { pageCount: pageCount - 1, pages: newPages, containerMaxWidth },
            lang,
        );
    }
    async getAllLangPages(chapterId: number): Promise<AllLangPagesType> {
        return await this.editChapterPagesRepository.getAllLangPages(chapterId);
    }
}
