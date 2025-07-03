import { Injectable } from '@nestjs/common';
import { EditBookCoversServiceInterface } from '../__common/interfaces/editBookCoversService';
import { EditMangaCoversRepository } from './editMangaCovers.repository';
import { MangaFileService } from 'src/modules/file/mangaFile.service';
import { EditedBookCoverList } from '../__common/dto/editedBookCovers.dto';
import { MangaId } from '../../_common/model/bookId';
import { MangaCoverId } from '../__common/dto/setMainCoverParams.dto';

@Injectable()
export class EditMangaCoversService implements EditBookCoversServiceInterface {
    constructor(
        private repository: EditMangaCoversRepository,
        private fileService: MangaFileService,
    ) {}

    async getEditedCovers(bookId: MangaId): Promise<EditedBookCoverList> {
        const covers = await this.repository.getEditedCovers(bookId);
        return { data: covers };
    }

    async addCovers(bookId: MangaId, covers: Express.Multer.File[]): Promise<void> {
        const savedCovers = await this.fileService.saveCovers(covers, bookId);
        await this.repository.addCovers(bookId, savedCovers);
        return;
    }

    async setMainCover(bookId: MangaId, coverId: MangaCoverId): Promise<void> {
        await this.repository.setMainCover(bookId, coverId);
    }

    async deleteCovers(bookId: MangaId, coversId: number[]): Promise<void> {
        const deletedCovers = await this.repository.deleteCovers(bookId, coversId);
        await this.fileService.deleteFiles(deletedCovers);
        return;
    }
}
