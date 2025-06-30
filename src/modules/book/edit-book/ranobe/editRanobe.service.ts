import { Injectable } from '@nestjs/common';
import { EditRanobeRepository } from './editRanobe.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { RanobeFileService } from 'src/modules/file/ranobeFile.service';
import { EditedRanobe } from './dto/editedRanobe.dto';
import { MutateRanobeDto } from './dto/mutateRanobe.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { EditBookServiceInterface } from '../__common/interfaces/editBookService';

@Injectable()
export class EditRanobeService implements EditBookServiceInterface {
    constructor(
        private repository: EditRanobeRepository,
        private fileService: RanobeFileService,
    ) {}

    async getEditedBook(bookId: number, lang: LangType): Promise<EditedRanobe> {
        return await this.repository.getEditedBook(bookId, lang);
    }

    async createBook(data: MutateRanobeDto, files: MutateBookFilesDto): Promise<void> {
        const bookId = await this.repository.createBook(data);
        if (files.cover?.length) {
            const [cover] = await this.fileService.saveCovers(files.cover, bookId);
            await this.repository.addCover(cover, bookId);
        }
        await this.updateBook(data, bookId, files.banner?.[0]);
        return;
    }

    async updateBook(
        data: MutateRanobeDto,
        bookId: number,
        banner?: Express.Multer.File,
    ): Promise<void> {
        if (banner) {
            const prevBanner = await this.repository.getBookBanner(bookId);
            const savedBanner = await this.fileService.saveBanner(banner, bookId);
            data.banner = savedBanner;
            if (prevBanner) await this.fileService.deleteFiles([prevBanner]);
        }
        if (data.urlId) data.urlId = data.urlId + '---' + bookId;
        await this.repository.updateBook(data, bookId);
        return;
    }
}
