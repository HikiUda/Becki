import { Injectable } from '@nestjs/common';
import { EditBookCoversServiceInterface } from '../__common/interfaces/editBookCoversService';
import { EditRanobeCoversRepository } from './editRanobeCovers.repository';
import { RanobeFileService } from 'src/modules/file/services/ranobeFile.service';
import { EditedBookCoverList } from '../__common/dto/editedBookCovers.dto';
import { RanobeId } from '../../_common/model/bookId';
import { RanobeCoverId } from '../__common/dto/setMainCoverParams.dto';

@Injectable()
export class EditRanobeCoversService implements EditBookCoversServiceInterface {
    constructor(
        private repository: EditRanobeCoversRepository,
        private fileService: RanobeFileService,
    ) {}

    async getEditedCovers(bookId: RanobeId): Promise<EditedBookCoverList> {
        const covers = await this.repository.getEditedCovers(bookId);
        return { data: covers };
    }

    async addCovers(bookId: RanobeId, covers: Express.Multer.File[]): Promise<void> {
        const savedCovers = await this.fileService.saveCovers(covers, bookId);
        await this.repository.addCovers(bookId, savedCovers);
        return;
    }

    async setMainCover(bookId: RanobeId, coverId: RanobeCoverId): Promise<void> {
        await this.repository.setMainCover(bookId, coverId);
    }

    async deleteCovers(bookId: RanobeId, coversId: number[]): Promise<void> {
        const deletedCovers = await this.repository.deleteCovers(bookId, coversId);
        await this.fileService.deleteFiles(deletedCovers);
        return;
    }
}
