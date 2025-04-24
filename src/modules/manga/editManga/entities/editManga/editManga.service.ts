import { BadRequestException, Injectable } from '@nestjs/common';
import { EditMangaServiceInterface } from './interfaces/editMangaService';
import { EditMangaRepository } from './editManga.repository';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { EditedMangaDto } from './dto/editedmanga.dto';
import { MutateMangaDto } from './dto/mutateManga/mutateManga.dto';
import { MangaFilesUploadType } from '../../types/fileUpload';
import { FileService } from 'src/modules/file/file.service';
import { EditMangaCoverService } from '../editMangaCover/editMangaCover.service';
@Injectable()
export class EditMangaService implements EditMangaServiceInterface {
    constructor(
        private editMangaRepository: EditMangaRepository,
        private fileService: FileService,
        private editMangaCoversService: EditMangaCoverService,
    ) {}

    async getEditedManga(id: number, lang: LangType): Promise<EditedMangaDto> {
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
                const covers = await this.editMangaCoversService.addMangaCovers(
                    mangaId,
                    files.covers,
                );
                dto.coverId = covers[0].id;
            }
            if (files?.banner?.length) {
                return await this.updateManga(dto, mangaId, lang, files.banner[0]);
            }
            return await this.updateManga(dto, mangaId, lang);
        } catch (e: any) {
            if (dto.coverId) {
                await this.editMangaCoversService.deleteMangaCovers([dto.coverId]);
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
            dto.urlId = dto.urlId + '---' + mangaId;
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
}
