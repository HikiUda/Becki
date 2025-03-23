import { BadRequestException, Injectable } from '@nestjs/common';
import { EditMangaServiceInterface } from './interfaces/editMangaService';
import { EditMangaRepository } from './editManga.repository';
import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from './dto/editedmanga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { MangaFilesUploadType } from './types/fileUpload';
import { MangaIdsType } from '../common/types/mangaTypes';
import { FileService } from 'src/modules/file/file.service';
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
        try {
            if (files.covers?.length) {
                const savedCovers = await this.fileService.saveMangaCovers(files.covers, mangaId);
                const covers = await this.editMangaRepository.addCovers(
                    savedCovers.map((cover) => cover.url),
                    mangaId,
                );
                dto.coversId = covers[0].id;
            }
            if (files?.banner?.length) {
                return await this.updateManga(dto, mangaId, lang, files.banner[0]);
            }
            return await this.updateManga(dto, mangaId, lang);
        } catch (e: any) {
            if (dto.coversId) {
                await this.deleteMangaCovers([dto.coversId]);
            }
            await this.deleteManga(mangaId, lang);
            throw new BadRequestException(
                'Что-то пошло не так. Пожалуйста попробуйте создать тайтл повторно.',
                { description: e.message?.split('\n').slice(-1) },
            );
        }
    }
    async updateManga(
        dto: MutateMangaDto,

        mangaId: number,
        lang: LangType,
        banner?: Express.Multer.File,
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
        } catch (e: any) {
            await this.fileService.deleteFiles(deleteFiles);

            throw new BadRequestException(
                'Что-то пошло не так. Пожалуйста попробуйте обновить тайтл повторно.',
                { description: e.message?.split('\n').slice(-1) },
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

    async getMangaCovers(mangaId: number): Promise<EditedMangaCovers[]> {
        return await this.editMangaRepository.getMangaCovers(mangaId);
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
