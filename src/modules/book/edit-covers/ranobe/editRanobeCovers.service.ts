import { Injectable } from '@nestjs/common';
import { EditBookCoversServiceInterface } from '../__common/interfaces/editBookCoversService';
import { EditRanobeCoversRepository } from './editRanobeCovers.repository';
import { RanobeFileService } from 'src/modules/file/ranobeFile.service';
import { EditedBookCoverList } from '../__common/dto/editedBookCovers.dto';

@Injectable()
export class EditRanobeCoversService implements EditBookCoversServiceInterface {
    constructor(
        private repository: EditRanobeCoversRepository,
        private fileService: RanobeFileService,
    ) {}

    async getEditedCovers(ranobeId: number): Promise<EditedBookCoverList> {
        const covers = await this.repository.getEditedCovers(ranobeId);
        return { data: covers };
    }

    async addCovers(ranobeId: number, covers: Express.Multer.File[]): Promise<void> {
        const savedCovers = await this.fileService.saveCovers(covers, ranobeId);
        await this.repository.addCovers(ranobeId, savedCovers);
        return;
    }

    async setMainCover(ranobeId: number, coverId: number): Promise<void> {
        await this.repository.setMainCover(ranobeId, coverId);
    }

    async deleteCovers(ranobeId: number, coversId: number[]): Promise<void> {
        const deletedCovers = await this.repository.deleteCovers(ranobeId, coversId);
        await this.fileService.deleteFiles(deletedCovers);
        return;
    }
}
