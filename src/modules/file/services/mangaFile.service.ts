import { Injectable } from '@nestjs/common';
import { FileLocalRepository } from '../fileLocal.repository';
import { join } from 'path';

export interface MangaFileServiceInterface {
    saveBanner: (banner: Express.Multer.File, mangaId: number) => Promise<string>;
    saveCovers: (covers: Express.Multer.File[], mangaId: number) => Promise<string[]>;
    saveChapterPage: (props: {
        page: Express.Multer.File;
        mangaId: number;
        chapterId: number;
    }) => Promise<string>;
    deleteFiles: (filesUrl: string[]) => Promise<void>;
}

@Injectable()
export class MangaFileService implements MangaFileServiceInterface {
    constructor(private fileRepository: FileLocalRepository) {}

    async saveBanner(banner: Express.Multer.File, mangaId: number): Promise<string> {
        const key = join('manga', `${mangaId}`);
        const savedBanner = await this.fileRepository.saveFiles([banner], key);
        return savedBanner[0].url;
    }

    async saveCovers(covers: Express.Multer.File[], mangaId: number): Promise<string[]> {
        const key = join('manga', `${mangaId}`, 'covers');
        const savedCovers = await this.fileRepository.saveFiles(covers, key);
        return savedCovers.map((cover) => cover.url);
    }

    async saveChapterPage(props: {
        page: Express.Multer.File;
        mangaId: number;
        chapterId: number;
    }): Promise<string> {
        const { page, mangaId, chapterId } = props;
        const key = join('manga', `${mangaId}`, 'chapters', `${chapterId}`);
        const savedPage = await this.fileRepository.saveFiles([page], key);
        return savedPage[0].url;
    }

    async deleteFiles(filesUrl: string[]): Promise<void> {
        await this.fileRepository.deleteFiles(filesUrl);
    }
}
