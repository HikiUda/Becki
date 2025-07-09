import { Injectable } from '@nestjs/common';
import { FileLocalRepository } from '../fileLocal.repository';
import { join } from 'path';

interface PeopleFileServiceInterface {
    saveAvatar: (personId: number, avatar: Express.Multer.File) => Promise<string>;
    deleteAvatar: (avatar: string) => Promise<void>;
}

@Injectable()
export class PeopleFileService implements PeopleFileServiceInterface {
    constructor(private fileRepository: FileLocalRepository) {}

    async saveAvatar(personId: number, avatar: Express.Multer.File): Promise<string> {
        const key = join('people', `${personId}`);
        const savedAvatar = await this.fileRepository.saveFiles([avatar], key);
        return savedAvatar[0].url;
    }

    async deleteAvatar(avatar: string): Promise<void> {
        await this.fileRepository.deleteFiles([avatar]);
    }
}
