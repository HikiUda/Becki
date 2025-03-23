import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EditMangaRepositoryInterface } from './interfaces/editMangaRepository';
import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from './dto/editedmanga.dto';
import { getEditedManga, toEditedMangaDto } from './prisma/getEditedManga';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { createManga } from './prisma/createManga';
import {
    createMangaOtherTitles,
    deleteMangaOtherTitles,
    updateMangaOtherTitles,
} from './prisma/mutateMangaTitles';
import { addJanres, deleteJanres } from './prisma/mutateManyToMany/mutateMangaJanres';
import { addTags, deleteTags } from './prisma/mutateManyToMany/mutateMangaTags';
import { addAuthors, deleteAuthors } from './prisma/mutateManyToMany/mutateMangaAuthors';
import { addArtists, deleteArtists } from './prisma/mutateManyToMany/mutateMangaArtists';
import { addPublishers, deletePublishers } from './prisma/mutateManyToMany/mutateMangaPublishers';
import { MangaIdsType } from '../common/types/mangaTypes';
import { updateManga } from './prisma/updateManga';
import { addMangaCovers, deleteMangaCovers, toEditedCoversDto } from './prisma/mutateMangaCovers';
import { deleteManga } from './prisma/deleteManga';

@Injectable()
export class EditMangaRepository implements EditMangaRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedManga(id: MangaIdsType, lang: LangType): Promise<EditedMangaDto> {
        const data = await getEditedManga(id, lang);
        const manga = toEditedMangaDto(data, lang);
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
        const manga = await this.prisma.$transaction(async (tx) => {
            const manga = await updateManga(dto, mangaId, tx);
            // mutate titles
            if (dto.otherTitles?.createTitles) {
                await createMangaOtherTitles(dto.otherTitles.createTitles, manga.id, tx);
            }
            if (dto.otherTitles?.updateTitles) {
                await updateMangaOtherTitles(dto.otherTitles.updateTitles, tx);
            }
            if (dto.otherTitles?.deleteTitles) {
                await deleteMangaOtherTitles(dto.otherTitles.deleteTitles, tx);
            }
            // mutate janres
            if (dto.janres?.add) {
                await addJanres(dto.janres.add, manga.id, tx);
            }
            if (dto.janres?.delete) {
                await deleteJanres(dto.janres.delete, manga.id, tx);
            }
            // mutate tags
            if (dto.tags?.add) {
                await addTags(dto.tags.add, manga.id, tx);
            }
            if (dto.tags?.delete) {
                await deleteTags(dto.tags.delete, manga.id, tx);
            }
            //mutate authors
            if (dto.authors?.add) {
                await addAuthors(dto.authors.add, manga.id, tx);
            }
            if (dto.authors?.delete) {
                await deleteAuthors(dto.authors.delete, manga.id, tx);
            }
            // mutate artitsts
            if (dto.artists?.add) {
                await addArtists(dto.artists.add, manga.id, tx);
            }
            if (dto.artists?.delete) {
                await deleteArtists(dto.artists.delete, manga.id, tx);
            }
            // mutate publishers
            if (dto.publishers?.add) {
                await addPublishers(dto.publishers.add, manga.id, tx);
            }
            if (dto.publishers?.delete) {
                await deletePublishers(dto.publishers.delete, manga.id, tx);
            }

            return manga;
        });

        return await this.getEditedManga(mangaId, lang);
    }
    async deleteManga(dto: EditedMangaDto): Promise<number> {
        const mangaId = this.prisma.$transaction(async (tx) => {
            await deleteMangaOtherTitles(
                dto.otherTitles.map((title) => title.id),
                tx,
            );
            await deleteJanres(
                dto.janres.map((janre) => janre.id),
                dto.id,
                tx,
            );
            await deleteTags(
                dto.tags.map((tag) => tag.id),
                dto.id,
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
    async getMangaCovers(mangaId: number): Promise<EditedMangaCovers[]> {
        const covers = await this.prisma.mangaCovers.findMany({ where: { mangaId } });
        const dto = toEditedCoversDto(covers);
        if (!dto) {
            throw new BadRequestException('Обложки не найдена');
        }
        return dto;
    }
    async addCovers(covers: string[], mangaId: number): Promise<EditedMangaCovers[]> {
        const addedCovers = await addMangaCovers(covers, mangaId);
        const dto = toEditedCoversDto(addedCovers);
        if (!dto) {
            throw new Error('Обложки не добавлены');
        }
        return dto;
    }
    async deleteCovers(coversId: number[]): Promise<EditedMangaCovers[]> {
        const deletedCovers = await deleteMangaCovers(coversId);
        const dto = toEditedCoversDto(deletedCovers);
        if (!dto) {
            throw new BadRequestException('Обложки не удалены. Повторите запрос.');
        }
        return dto;
    }
    async getMangaBanner(mangaId: number): Promise<string | null> {
        const manga = await this.prisma.manga.findUnique({ where: { id: mangaId } });
        if (!manga) throw new NotFoundException('Такой манги не существует');
        return manga.banner;
    }
}
