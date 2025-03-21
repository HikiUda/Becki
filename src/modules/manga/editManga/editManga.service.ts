import { BadRequestException, Injectable } from '@nestjs/common';
import { EditMangaServiceInterface } from './interfaces/editMangaService';
import { EditMangaRepository } from './editManga.repository';
import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from './dto/editedmanga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { MangaFilesUploadType } from './types/fileUpload';
import { MangaIdsType } from '../common/types/mangaTypes';
import { FileService } from 'src/modules/file/file.service';
//TODO rollback for create and update
@Injectable()
export class EditMangaService implements EditMangaServiceInterface {
    constructor(
        private editMangaRepository: EditMangaRepository,
        private fileService: FileService,
    ) {}

    async getEditedManga(id: MangaIdsType, lang: LangType): Promise<EditedMangaDto> {
        return await this.editMangaRepository.getEditedManga(id, lang);
    }
    async createManga(
        dto: MutateMangaDto,
        lang: LangType,
        files: MangaFilesUploadType,
    ): Promise<EditedMangaDto> {
        const mangaId = await this.editMangaRepository.createManga(dto);
        const deleteFiles: string[] = [];
        try {
            if (files.banner?.length) {
                const savedBanner = await this.fileService.saveMangaBanner(
                    files.banner[0],
                    mangaId,
                );
                dto.banner = savedBanner.url;
                deleteFiles.push(savedBanner.url);
            }
            if (files.covers?.length) {
                const savedCovers = await this.fileService.saveMangaCovers(files.covers, mangaId);
                const covers = await this.editMangaRepository.addCovers(
                    savedCovers.map((cover) => cover.url),
                    mangaId,
                );
                dto.coversId = covers[0].id;
                deleteFiles.push(covers[0].cover);
            }
            return await this.editMangaRepository.updateManga(dto, mangaId, lang);
        } catch {
            await this.deleteManga(mangaId, lang);
            await this.fileService.deleteFiles(deleteFiles);
            throw new BadRequestException(
                'Что-то пошло не так. Пожалуйста попробуйте создать тайтл повторно.',
            );
        }
    }
    async updateManga(
        dto: MutateMangaDto,
        banner: Express.Multer.File,
        mangaId: number,
        lang: LangType,
    ): Promise<EditedMangaDto> {
        const deleteFiles: string[] = [];
        try {
            let prevBanner: string | null = null;
            if (banner) {
                prevBanner = await this.editMangaRepository.getMangaBanner(mangaId);
                const savedBanner = await this.fileService.saveMangaBanner(banner, mangaId);
                dto.banner = savedBanner.url;
                deleteFiles.push(savedBanner.url);
            }
            const manga = await this.editMangaRepository.updateManga(dto, mangaId, lang);
            if (prevBanner) {
                await this.fileService.deleteFiles([prevBanner]);
            }
            return manga;
        } catch {
            await this.fileService.deleteFiles(deleteFiles);
            throw new BadRequestException(
                'Что-то пошло не так. Пожалуйста попробуйте обновить тайтл повторно.',
            );
        }
    }
    async deleteManga(mangaId: number, lang: LangType): Promise<EditedMangaDto> {
        const editedManga = await this.editMangaRepository.getEditedManga(mangaId, lang);
        await this.editMangaRepository.deleteManga(editedManga);
        const deletefiles = editedManga.covers.map((cover) => cover.cover);
        if (editedManga.banner) deletefiles.push(editedManga.banner);
        await this.fileService.deleteFiles(deletefiles);
        return editedManga;
    }

    async addMangaCovers(
        mangaId: number,
        covers: Express.Multer.File[],
    ): Promise<EditedMangaCovers[]> {
        let deleteFiles: string[] = [];
        try {
            const savedCovers = (await this.fileService.saveMangaCovers(covers, mangaId)).map(
                (cover) => cover.url,
            );
            deleteFiles = savedCovers;
            const addedCovers = await this.editMangaRepository.addCovers(savedCovers, mangaId);
            return addedCovers;
        } catch {
            await this.fileService.deleteFiles(deleteFiles);
            throw new BadRequestException(
                'Неудалось сохранить обложки. Пожалуйста повторите запрос.',
            );
        }
    }
    async deleteMangaCovers(coversId: number[]): Promise<EditedMangaCovers[]> {
        const deletedCovers = await this.editMangaRepository.deleteCovers(coversId);
        await this.fileService.deleteFiles(deletedCovers.map((cover) => cover.cover));
        return deletedCovers;
    }
}
