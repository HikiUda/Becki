import { Injectable } from '@nestjs/common';
import { EditRanobeRepository } from './editRanobe.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { RanobeFileService } from 'src/modules/file/ranobeFile.service';
import { EditedRanobeDto } from './dto/editedRanobe.dto';
import { MutateRanobeDto } from './dto/mutateRanobe.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { EditBookServiceInterface } from '../__common/interfaces/editMangaService';

@Injectable()
export class EditRanobeService implements EditBookServiceInterface {
    constructor(
        private repository: EditRanobeRepository,
        private fileService: RanobeFileService,
    ) {}

    async getEditedBook(ranobeId: number, lang: LangType): Promise<EditedRanobeDto> {
        return await this.repository.getEditedBook(ranobeId, lang);
    }

    async createBook(
        dto: MutateRanobeDto,
        files: MutateBookFilesDto,
        lang: LangType,
    ): Promise<EditedRanobeDto> {
        const ranobeId = await this.repository.createBook(dto);
        if (files.cover?.length) {
            const [cover] = await this.fileService.saveCovers(files.cover, ranobeId);
            await this.repository.addCover(cover, ranobeId);
        }
        return await this.updateBook(dto, ranobeId, lang, files.banner?.[0]);
    }

    async updateBook(
        dto: MutateRanobeDto,
        ranobeId: number,
        lang: LangType,
        banner?: Express.Multer.File,
    ): Promise<EditedRanobeDto> {
        if (banner) {
            const prevBanner = await this.repository.getBookBanner(ranobeId);
            const savedBanner = await this.fileService.saveBanner(banner, ranobeId);
            dto.banner = savedBanner;
            if (prevBanner) await this.fileService.deleteFiles([prevBanner]);
        }
        if (dto.urlId) dto.urlId = dto.urlId + '---' + ranobeId;
        return await this.repository.updateBook(dto, ranobeId, lang);
    }
}
