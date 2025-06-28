import { Injectable, NotFoundException } from '@nestjs/common';
import { EditBookRepositoryInterface } from '../__common/interfaces/editMangaRepository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { getEditedManga } from './prisma/getEditedManga';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { createManga } from './prisma/createManga';
import { EditedMangaDto } from './dto/editedManga.dto';
import { toEditedBookDto } from '../__common/prisma/toEditedBookDto';
import { getEditedBookCategories } from '../__common/prisma/getEditedBookCategories';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { updateManga } from './prisma/updateManga';

@Injectable()
export class EditMangaRepository implements EditBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedBook(mangaId: number, lang: LangType): Promise<EditedMangaDto> {
        const data = await getEditedManga(this.prisma, mangaId);
        if (!data) throw new NotFoundException('Такого тайтла не существует.');
        const categories = await getEditedBookCategories(this.prisma, {
            genresIds: data.genres,
            tagsIds: data.tags,
            lang,
        });
        const manga = toEditedBookDto(data, categories);
        return manga;
    }

    async createBook(dto: MutateMangaDto): Promise<number> {
        return await createManga(this.prisma, dto);
    }

    async updateBook(
        dto: MutateMangaDto,
        mangaId: number,
        lang: LangType,
    ): Promise<EditedMangaDto> {
        await updateManga(this.prisma, dto, mangaId);
        return await this.getEditedBook(mangaId, lang);
    }

    async addCover(cover: string, mangaId: number): Promise<void> {
        await this.prisma.mangaCovers.create({
            data: {
                cover,
                main: true,
                bookId: mangaId,
            },
        });
        return;
    }

    async getBookBanner(mangaId: number): Promise<string | null> {
        const manga = await this.prisma.manga.findUnique({
            where: { id: mangaId },
            select: { banner: true },
        });
        if (!manga) return null;
        return manga.banner;
    }
}
