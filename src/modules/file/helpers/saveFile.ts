import { writeFile } from 'fs/promises';
import { FileSaveReturnType } from '../types/file';
import { v4 } from 'uuid';
import { join } from 'path';
export const UrlLocalFileStorage = 'http://localhost:8000/';
export async function saveFile(
    file: Express.Multer.File,
    uploadFolder: string,
    key: string,
): Promise<FileSaveReturnType> {
    const splitFilename = file.originalname.split('.');
    const newFilename = v4() + '.' + splitFilename[splitFilename.length - 1];

    await writeFile(join(uploadFolder, newFilename), file.buffer);
    return {
        name: newFilename,
        url: `${key.replaceAll('\\', '/')}/${newFilename}`,
    };
}
