import { Injectable } from '@nestjs/common';
import { EditMangaCoverRepositoryInterface } from './interfaces/editMangaCoverRepository';
import { addMangaCovers } from './prisma/addMangaCovers';
import { deleteMangaCovers } from './prisma/deleteMangaCovers';
import { EditedMangaCover } from './dto/editedMangaCover.dto';
import { getMangaCovers } from './prisma/getMangaCovers';

@Injectable()
export class EditMangaCoverRepository implements EditMangaCoverRepositoryInterface {
    constructor() {}
    async getMangaCovers(mangaId: number): Promise<EditedMangaCover[]> {
        const covers = await getMangaCovers(mangaId);
        return covers;
    }
    async addCovers(covers: string[], mangaId: number): Promise<EditedMangaCover[]> {
        const addedCovers = await addMangaCovers(covers, mangaId);
        return addedCovers;
    }
    async deleteCovers(coversId: number[]): Promise<EditedMangaCover[]> {
        const deletedCovers = await deleteMangaCovers(coversId);
        return deletedCovers;
    }
}
