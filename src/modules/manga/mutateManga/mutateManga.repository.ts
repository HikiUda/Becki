import { Injectable } from '@nestjs/common';
import { MutateMangaRepositoryInterface } from './interfaces/mutateMangaRepository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Manga, Prisma } from '@prisma/client';

@Injectable()
export class MutateMangaRepository implements MutateMangaRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async createManga(data: Prisma.MangaCreateInput): Promise<Manga> {
        const createdManga = await this.prisma.manga.create({
            data,
        });
        return createdManga;
    }
}
