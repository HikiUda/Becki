import { Injectable, NotFoundException } from '@nestjs/common';
import { EditMangaRepositoryInterface } from '../__common/interfaces/editMangaRepository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedMangaDto } from '../__common/dto/editedBook.dto';
import { getEditedManga, toEditedMangaDto } from './prisma/getEditedManga';
import { MutateMangaDto } from '../__common/dto/mutateManga/mutateManga.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { createManga } from './prisma/createManga';
import { deleteAuthors } from './prisma/mutateAuthorsEntities/mutateMangaAuthors';
import { deleteArtists } from './prisma/mutateAuthorsEntities/mutateMangaArtists';
import { deletePublishers } from './prisma/mutateAuthorsEntities/mutateMangaPublishers';
import { updateManga } from './prisma/updateManga';
import { deleteMangaCovers } from '../editMangaCover/prisma/deleteMangaCovers';
import { deleteManga } from './prisma/deleteManga';
import { deleteMangaOtherTitles } from './prisma/mutateOtherTitles/deleteOtherTitles';
import { mutateMangaCategories } from './prisma/mutateMangaCategories/mutateMangCategories';
import { mutateOtherTitles } from './prisma/mutateOtherTitles/mutateOtherTitles';
import { mutateAllAuthorsEntities } from './prisma/mutateAuthorsEntities/mutateAllAuthorsEntities';

@Injectable()
export class EditMangaRepository implements EditMangaRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedManga(id: number, lang: LangType): Promise<EditedMangaDto> {
        const data = await getEditedManga(id);
        const manga = await toEditedMangaDto(data, lang);
        if (!manga) throw new NotFoundException('Такого тайтла не существует.');
        return manga;
    }

    async createManga(dto: MutateMangaDto): Promise<number> {
        const manga = await createManga(dto);
        return manga.id;
    }
    async updateManga(
        dto: MutateMangaDto,
        mangaId: number,
        lang: LangType,
    ): Promise<EditedMangaDto> {
        await this.prisma.$transaction(async (tx) => {
            const manga = await updateManga(dto, mangaId, tx);
            // mutate titles
            await mutateOtherTitles(dto, manga.id, tx);
            //mutate Categories
            await mutateMangaCategories(dto, mangaId, tx);
            //mutate authors
            await mutateAllAuthorsEntities(dto, mangaId, tx);
        });

        return await this.getEditedManga(mangaId, lang);
    }
    async deleteManga(dto: EditedMangaDto): Promise<number> {
        const mangaId = this.prisma.$transaction(async (tx) => {
            await deleteMangaOtherTitles(
                dto.otherTitles.map((title) => title.id),
                tx,
            );
            await deleteAuthors(
                dto.authors.map((author) => author.id),
                dto.id,
                tx,
            );
            await deleteArtists(
                dto.artists.map((artist) => artist.id),
                dto.id,
                tx,
            );
            await deletePublishers(
                dto.publishers.map((publisher) => publisher.id),
                dto.id,
                tx,
            );
            await deleteMangaCovers(dto.covers.map((cover) => cover.id));
            await deleteManga(dto.id, tx);
            return dto.id;
        });
        return mangaId;
    }

    async getMangaBanner(mangaId: number): Promise<string | null> {
        const manga = await this.prisma.manga.findUnique({
            where: { id: mangaId },
            select: { banner: true },
        });
        if (!manga) throw new NotFoundException('Такой манги не существует');
        return manga.banner;
    }
}
