import { Injectable } from '@nestjs/common';
import { EditMangaRepository } from './editManga.repository';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { MangaFileService } from 'src/modules/file/mangaFile.service';
import { EditBookServiceInterface } from '../__common/interfaces/editBookService';
import { EditedManga } from './dto/editedManga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { MangaId } from '../../_common/model/bookId';
@Injectable()
export class EditMangaService implements EditBookServiceInterface {
    constructor(
        private repository: EditMangaRepository,
        private fileService: MangaFileService,
    ) {}

    async getEditedBook(bookId: MangaId, lang: Lang): Promise<EditedManga> {
        return await this.repository.getEditedBook(bookId, lang);
    }

    async createBook(data: MutateMangaDto, files: MutateBookFilesDto): Promise<void> {
        const bookId = await this.repository.createBook(data);
        if (files.cover?.length) {
            const [cover] = await this.fileService.saveCovers(files.cover, bookId);
            await this.repository.addCover(cover, bookId);
        }
        await this.updateBook(data, bookId, files.banner?.[0]);
        return;
    }

    async updateBook(
        data: MutateMangaDto,
        bookId: MangaId,
        banner?: Express.Multer.File,
    ): Promise<void> {
        if (banner) {
            const prevBanner = await this.repository.getBookBanner(bookId);
            const savedBanner = await this.fileService.saveBanner(banner, bookId);
            data.banner = savedBanner;
            if (prevBanner) await this.fileService.deleteFiles([prevBanner]);
        }
        if (data.urlId) data.urlId = data.urlId + '---' + bookId;
        await this.repository.updateBook(data, bookId);
        return;
    }
}
