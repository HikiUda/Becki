import { Injectable } from '@nestjs/common';
import { EditMangaRepository } from './editManga.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaFileService } from 'src/modules/file/mangaFile.service';
import { EditBookServiceInterface } from '../__common/interfaces/editMangaService';
import { EditedMangaDto } from './dto/editedManga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
@Injectable()
export class EditMangaService implements EditBookServiceInterface {
    constructor(
        private repository: EditMangaRepository,
        private fileService: MangaFileService,
    ) {}

    async getEditedBook(mangaId: number, lang: LangType): Promise<EditedMangaDto> {
        return await this.repository.getEditedBook(mangaId, lang);
    }

    async createBook(
        dto: MutateMangaDto,
        files: MutateBookFilesDto,
        lang: LangType,
    ): Promise<EditedMangaDto> {
        const mangaId = await this.repository.createBook(dto);
        if (files.cover?.length) {
            const [cover] = await this.fileService.saveCovers(files.cover, mangaId);
            await this.repository.addCover(cover, mangaId);
        }
        return await this.updateBook(dto, mangaId, lang, files.banner?.[0]);
    }

    async updateBook(
        dto: MutateMangaDto,
        mangaId: number,
        lang: LangType,
        banner?: Express.Multer.File,
    ): Promise<EditedMangaDto> {
        if (banner) {
            const prevBanner = await this.repository.getBookBanner(mangaId);
            const savedBanner = await this.fileService.saveBanner(banner, mangaId);
            dto.banner = savedBanner;
            if (prevBanner) await this.fileService.deleteFiles([prevBanner]);
        }
        dto.urlId = dto.urlId + '---' + mangaId;
        return await this.repository.updateBook(dto, mangaId, lang);
    }
}
