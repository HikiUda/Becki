import { BadRequestException, Injectable } from '@nestjs/common';
import { EditMangaCoverServiceInterface } from './interfaces/editMangaCoverService';
import { EditMangaCoverRepository } from './editMangaCover.repository';
import { EditedMangaCover } from './dto/editedMangaCover.dto';
import { FileService } from 'src/modules/file/file.service';

@Injectable()
export class EditMangaCoverService implements EditMangaCoverServiceInterface {
    constructor(
        private editMangaCoverRepository: EditMangaCoverRepository,
        private fileService: FileService,
    ) {}
    async getMangaCovers(mangaId: number): Promise<EditedMangaCover[]> {
        return await this.editMangaCoverRepository.getMangaCovers(mangaId);
    }

    async addMangaCovers(
        mangaId: number,
        covers: Express.Multer.File[],
    ): Promise<EditedMangaCover[]> {
        let savedCovers: string[] = [];
        try {
            savedCovers = (await this.fileService.saveMangaCovers(covers, mangaId)).map(
                (cover) => cover.url,
            );
            const addedCovers = await this.editMangaCoverRepository.addCovers(savedCovers, mangaId);
            return addedCovers;
        } catch {
            await this.fileService.deleteFiles(savedCovers);
            throw new BadRequestException(
                'Неудалось сохранить обложки. Пожалуйста повторите запрос.',
            );
        }
    }
    async deleteMangaCovers(coversId: number[]): Promise<EditedMangaCover[]> {
        try {
            const deletedCovers = await this.editMangaCoverRepository.deleteCovers(coversId);
            await this.fileService.deleteFiles(deletedCovers.map((cover) => cover.cover));
            return deletedCovers;
        } catch {
            throw new BadRequestException('Что-то пошло не так.');
        }
    }
}
