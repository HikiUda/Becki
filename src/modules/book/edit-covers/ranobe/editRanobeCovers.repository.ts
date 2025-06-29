import { Injectable } from '@nestjs/common';
import { EditBookCoversRepositoryInterface } from '../__common/interfaces/editBookCoversRepository';
import { EditedBookCover } from '../__common/dto/editedBookCovers.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getCreateBookCoversInput } from '../__common/prisma/getCreateBookCoversInput';

@Injectable()
export class EditRanobeCoversRepository implements EditBookCoversRepositoryInterface {
    constructor(private prisma: PrismaService) {}
    async getEditedCovers(ranobeId: number): Promise<EditedBookCover[]> {
        return await this.prisma.ranobeCovers.findMany({
            where: { bookId: ranobeId },
            select: { id: true, cover: true, main: true },
        });
    }

    async addCovers(ranobeId: number, covers: string[]): Promise<void> {
        const haveMainCover = await this.prisma.ranobeCovers.findFirst({
            where: { bookId: ranobeId, main: true },
        });
        await this.prisma.ranobeCovers.createMany({
            data: getCreateBookCoversInput(ranobeId, covers, !haveMainCover),
        });
        return;
    }

    async setMainCover(ranobeId: number, coverId: number): Promise<void> {
        await this.prisma.ranobeCovers.updateMany({
            where: { bookId: ranobeId },
            data: { main: false },
        });
        await this.prisma.ranobeCovers.update({ where: { id: coverId }, data: { main: true } });
        return;
    }

    async deleteCovers(ranobeId: number, coversId: number[]): Promise<string[]> {
        const covers = await this.prisma.ranobeCovers.findMany({
            where: { id: { in: coversId }, bookId: ranobeId },
            select: { cover: true },
        });

        await this.prisma.ranobeCovers.deleteMany({
            where: { id: { in: coversId }, bookId: ranobeId },
        });

        return covers.map((cover) => cover.cover);
    }
}
