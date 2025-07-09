import { Injectable } from '@nestjs/common';
import { FileLocalRepository } from '../fileLocal.repository';
import { join } from 'path';

export interface RanobeFileServiceInterface {
    saveBanner: (banner: Express.Multer.File, ranobeId: number) => Promise<string>;
    saveCovers: (covers: Express.Multer.File[], ranobeId: number) => Promise<string[]>;
    deleteFiles: (filesUrl: string[]) => Promise<void>;
}

@Injectable()
export class RanobeFileService implements RanobeFileServiceInterface {
    constructor(private fileRepository: FileLocalRepository) {}

    async saveBanner(banner: Express.Multer.File, ranobeId: number): Promise<string> {
        const key = join('ranobe', `${ranobeId}`);
        const savedBanner = await this.fileRepository.saveFiles([banner], key);
        return savedBanner[0].url;
    }

    async saveCovers(covers: Express.Multer.File[], ranobeId: number): Promise<string[]> {
        const key = join('ranobe', `${ranobeId}`, 'covers');
        const savedCovers = await this.fileRepository.saveFiles(covers, key);
        return savedCovers.map((cover) => cover.url);
    }

    async deleteFiles(filesUrl: string[]): Promise<void> {
        await this.fileRepository.deleteFiles(filesUrl);
    }
}
