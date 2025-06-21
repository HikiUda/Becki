import { Injectable } from '@nestjs/common';
import { FileLocalRepository } from './fileLocal.repository';
import { FileServiceInterface } from './interfaces/fileService';
import { join } from 'path';
import { FileSaveReturnType } from './types/file';
import { LangType } from 'src/shared/dto/query/langQuery.dto';

@Injectable()
export class FileService implements FileServiceInterface {
    constructor(private fileRepository: FileLocalRepository) {}

    async saveMangaBanner(
        banner: Express.Multer.File,
        mangaId: number,
    ): Promise<FileSaveReturnType> {
        const key = join('mangas', `${mangaId}`);
        const savedBanner = await this.fileRepository.saveFiles([banner], key);
        return savedBanner[0];
    }
    async saveMangaCovers(
        covers: Express.Multer.File[],
        mangaId: number,
    ): Promise<FileSaveReturnType[]> {
        const key = join('mangas', `${mangaId}`, 'covers');
        const savedCovers = await this.fileRepository.saveFiles(covers, key);
        return savedCovers;
    }
    async saveChapterPage(
        page: Express.Multer.File,
        mangaId: number,
        chapterId: number,
        lang: LangType,
    ): Promise<FileSaveReturnType> {
        const key = join('mangas', `${mangaId}`, 'chapters', `${chapterId}`, lang);
        const savedPage = await this.fileRepository.saveFiles([page], key);
        return savedPage[0];
    }

    async deleteFiles(filesUrl: string[]): Promise<void> {
        await this.fileRepository.deleteFiles(filesUrl);
    }
}
