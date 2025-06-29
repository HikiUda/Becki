import { Injectable } from '@nestjs/common';
import { EditBookCoversServiceInterface } from '../__common/interfaces/editBookCoversService';
import { EditMangaCoversRepository } from './editMangaCovers.repository';
import { MangaFileService } from 'src/modules/file/mangaFile.service';
import { EditedBookCoverList } from '../__common/dto/editedBookCovers.dto';

@Injectable()
export class EditMangaCoversService implements EditBookCoversServiceInterface {
    constructor(
        private repository: EditMangaCoversRepository,
        private fileService: MangaFileService,
    ) {}

    async getEditedCovers(mangaId: number): Promise<EditedBookCoverList> {
        const covers = await this.repository.getEditedCovers(mangaId);
        return { data: covers };
    }

    async addCovers(mangaId: number, covers: Express.Multer.File[]): Promise<void> {
        const savedCovers = await this.fileService.saveCovers(covers, mangaId);
        await this.repository.addCovers(mangaId, savedCovers);
        return;
    }

    async setMainCover(mangaId: number, coverId: number): Promise<void> {
        await this.repository.setMainCover(mangaId, coverId);
    }

    async deleteCovers(mangaId: number, coversId: number[]): Promise<void> {
        const deletedCovers = await this.repository.deleteCovers(mangaId, coversId);
        await this.fileService.deleteFiles(deletedCovers);
        return;
    }
}
