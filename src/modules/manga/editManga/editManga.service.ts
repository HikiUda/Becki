import { Injectable } from '@nestjs/common';
import { EditMangaServiceInterface } from './interfaces/editMangaService';
import { EditMangaRepository } from './editManga.repository';
import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from './dto/editedmanga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { MangaFilesUploadType } from './types/fileUpload';

@Injectable()
export class EditMangaService implements EditMangaServiceInterface {
    constructor(private editMangaRepository: EditMangaRepository) {}
    async getEditedManga(id: number, lang: LangType): Promise<EditedMangaDto> {
        return await this.editMangaRepository.getEditedManga(id, lang);
    }
    async createManga(
        dto: MutateMangaDto,
        lang: LangType,
        files: MangaFilesUploadType,
    ): Promise<EditedMangaDto> {
        return await this.editMangaRepository.createManga(dto, lang);
    }
}
