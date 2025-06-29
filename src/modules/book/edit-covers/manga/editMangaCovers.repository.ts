import { Injectable } from '@nestjs/common';
import { EditBookCoversRepositoryInterface } from '../__common/interfaces/editBookCoversRepository';
import { EditedBookCover } from '../__common/dto/editedBookCovers.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getCreateBookCoversInput } from '../__common/prisma/getCreateBookCoversInput';

@Injectable()
export class EditMangaCoversRepository implements EditBookCoversRepositoryInterface {
    constructor(private prisma: PrismaService) {}
    async getEditedCovers(mangaId: number): Promise<EditedBookCover[]> {
        return await this.prisma.mangaCovers.findMany({
            where: { bookId: mangaId },
            select: { id: true, cover: true, main: true },
        });
    }

    async addCovers(mangaId: number, covers: string[]): Promise<void> {
        const haveMainCover = await this.prisma.mangaCovers.findFirst({
            where: { bookId: mangaId, main: true },
        });
        await this.prisma.mangaCovers.createMany({
            data: getCreateBookCoversInput(mangaId, covers, !haveMainCover),
        });
        return;
    }

    async setMainCover(mangaId: number, coverId: number): Promise<void> {
        await this.prisma.mangaCovers.updateMany({
            where: { bookId: mangaId },
            data: { main: false },
        });
        await this.prisma.mangaCovers.update({ where: { id: coverId }, data: { main: true } });
        return;
    }

    async deleteCovers(mangaId: number, coversId: number[]): Promise<string[]> {
        const covers = await this.prisma.mangaCovers.findMany({
            where: { id: { in: coversId }, bookId: mangaId },
            select: { cover: true },
        });

        await this.prisma.mangaCovers.deleteMany({
            where: { id: { in: coversId }, bookId: mangaId },
        });

        return covers.map((cover) => cover.cover);
    }
}
