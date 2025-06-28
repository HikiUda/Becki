import { readdir } from 'fs/promises';

export async function isDirEmpty(dirname: string): Promise<boolean> {
    const files = await readdir(dirname);
    return files.length === 0;
}
