import { BadRequestException, Injectable } from '@nestjs/common';
import { FileRepositoryInterface } from './interfaces/fileRepository';
import { join } from 'path';
import { access, mkdir, rm } from 'fs/promises';
import { FileSaveReturnType } from './types/file';
import { saveFile } from './helpers/saveFile';
import { clearEmptyDir } from './helpers/clearEmptyDir';

@Injectable()
export class FileLocalRepository implements FileRepositoryInterface {
    constructor() {}

    async deleteFiles(filesUrl: string[]): Promise<void> {
        for (let i = 0; i < filesUrl.length; i++) {
            const url = filesUrl[i];
            const filePath = join(__dirname, '..', '..', '..', 'static', url);
            try {
                await access(filePath);
                await rm(filePath);
                await clearEmptyDir(filePath);
            } catch (e: any) {
                console.log(e);
                throw new BadRequestException('Такого файла не существует');
            }
        }
    }

    async saveFiles(files: Express.Multer.File[], key: string = ''): Promise<FileSaveReturnType[]> {
        const savedFiles: FileSaveReturnType[] = [];
        const uploadFolder = join(__dirname, '..', '..', '..', 'static', key);
        try {
            await access(uploadFolder);
        } catch {
            await mkdir(uploadFolder, { recursive: true });
        }
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const savedFile = await saveFile(file, uploadFolder, key);
                savedFiles.push(savedFile);
            }
            return savedFiles;
        } catch (e) {
            this.deleteFiles(savedFiles.map((file) => file.url));
            throw new BadRequestException('Неудалось загрузить файлы');
        }
    }
}
