import { join } from 'path';
import { isDirEmpty } from './isDirEmpty';
import { rmdir } from 'fs/promises';

function reducePath(filePath: string): string {
    return join(...filePath.split(/\\|\//).slice(0, -1));
}

export async function clearEmptyDir(filePath: string) {
    let currentDir = reducePath(filePath);
    while (await isDirEmpty(currentDir)) {
        await rmdir(currentDir);
        currentDir = reducePath(currentDir);
    }
}
