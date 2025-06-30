import { Injectable } from '@nestjs/common';
import { EditBookCoversRepositoryInterface } from '../__common/interfaces/editBookCoversRepository';
import { EditedBookCover } from '../__common/dto/editedBookCovers.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getCreateBookCoversInput } from '../__common/prisma/getCreateBookCoversInput';

@Injectable()
export class EditMangaCoversRepository implements EditBookCoversRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedCovers(bookId: number): Promise<EditedBookCover[]> {
        return await this.prisma.mangaCovers.findMany({
            where: { bookId },
            select: { id: true, cover: true, main: true },
        });
    }

    async addCovers(bookId: number, covers: string[]): Promise<void> {
        const haveMainCover = await this.prisma.mangaCovers.findFirst({
            where: { bookId, main: true },
        });
        await this.prisma.mangaCovers.createMany({
            data: getCreateBookCoversInput(bookId, covers, !haveMainCover),
        });
        return;
    }

    async setMainCover(bookId: number, coverId: number): Promise<void> {
        await this.prisma.mangaCovers.updateMany({
            where: { bookId },
            data: { main: false },
        });
        await this.prisma.mangaCovers.update({
            where: { id: coverId, bookId },
            data: { main: true },
        });
        return;
    }

    async deleteCovers(bookId: number, coversId: number[]): Promise<string[]> {
        const covers = await this.prisma.mangaCovers.findMany({
            where: { id: { in: coversId }, bookId },
            select: { cover: true },
        });

        await this.prisma.mangaCovers.deleteMany({
            where: { id: { in: coversId }, bookId },
        });

        return covers.map((cover) => cover.cover);
    }
}
