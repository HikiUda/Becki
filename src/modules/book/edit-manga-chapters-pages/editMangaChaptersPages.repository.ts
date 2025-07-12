import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EditMangaChaptersPagesRepositoryInterface } from './interfaces/editMangaChaptersPagesRepository';
import { MangaChapterParams } from '../_common/model/bookId';
import { MangaChapterPages, MangaChapterPagesSchema } from '../_common/model/mangaChapterPages';

@Injectable()
export class EditMangaChaptersPagesRepository implements EditMangaChaptersPagesRepositoryInterface {
    constructor(private prisma: PrismaService) {}
    async getPages({ chapterId }: MangaChapterParams): Promise<MangaChapterPages> {
        const data = await this.prisma.mangaChapters.findUnique({
            where: { id: chapterId },
            select: { pages: true },
        });
        if (!data) throw new NotFoundException('Такой главы не существует');
        return MangaChapterPagesSchema.parse(data.pages);
    }

    async setPages({ chapterId }: MangaChapterParams, data: MangaChapterPages): Promise<void> {
        await this.prisma.mangaChapters.update({
            where: { id: chapterId },
            data: { pages: { ...data } },
        });
        return;
    }
}
