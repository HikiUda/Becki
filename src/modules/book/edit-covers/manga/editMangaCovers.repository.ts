import { Injectable } from '@nestjs/common';
import { EditBookCoversRepositoryInterface } from '../__common/interfaces/editBookCoversRepository';
import { EditedBookCover } from '../__common/dto/editedBookCovers.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getCreateBookCoversInput } from '../__common/prisma/getCreateBookCoversInput';
import { MangaId } from '../../_common/model/bookId';
import { MangaCoverId } from '../__common/dto/setMainCoverParams.dto';

@Injectable()
export class EditMangaCoversRepository implements EditBookCoversRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedCovers(bookId: MangaId): Promise<EditedBookCover[]> {
        return await this.prisma.mangaCovers.findMany({
            where: { bookId },
            select: { id: true, cover: true, main: true },
        });
    }

    async addCovers(bookId: MangaId, covers: string[]): Promise<void> {
        const haveMainCover = await this.prisma.mangaCovers.findFirst({
            where: { bookId, main: true },
        });
        await this.prisma.mangaCovers.createMany({
            data: getCreateBookCoversInput(bookId, covers, !haveMainCover),
        });
        return;
    }

    async setMainCover(bookId: MangaId, coverId: MangaCoverId): Promise<void> {
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

    async deleteCovers(bookId: MangaId, coversId: number[]): Promise<string[]> {
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
