import { Injectable } from '@nestjs/common';
import { EditMangaRepositoryInterface } from './interfaces/editMangaRepository';
import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from './dto/editedmanga.dto';
import { getEditedManga, toEditedMangaDto } from './prisma/getEditedManga';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { createManga } from './prisma/createManga';
import { createMangaTitles } from './prisma/mutateMangaTitles';
import { addJanres } from './prisma/mutateManyToMany/mutateMangaJanres';
import { addTags } from './prisma/mutateManyToMany/mutateMangaTags';
import { addAuthors } from './prisma/mutateManyToMany/mutateMangaAuthors';
import { addArtists } from './prisma/mutateManyToMany/mutateMangaArtists';
import { addPublishers } from './prisma/mutateManyToMany/mutateMangaPublishers';

@Injectable()
export class EditMangaRepository implements EditMangaRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedManga(id: number, lang: LangType): Promise<EditedMangaDto> {
        const data = await getEditedManga(id, lang);
        const manga = toEditedMangaDto(data, lang);
        //TODO handle error
        if (!manga) throw new Error('manga have no exist');
        return manga;
    }

    async createManga(dto: MutateMangaDto, lang: LangType): Promise<EditedMangaDto> {
        //TODO handle error
        const mangaId = await this.prisma.$transaction(async (tx) => {
            const manga = await createManga(dto, tx);
            if (dto.titles?.createTitles) {
                await createMangaTitles(dto.titles.createTitles, manga.id, tx);
            }
            if (dto.janres?.add) {
                await addJanres(dto.janres.add, manga.id, tx);
            }
            if (dto.tags?.add) {
                await addTags(dto.tags.add, manga.id, tx);
            }
            if (dto.authors?.add) {
                await addAuthors(dto.authors.add, manga.id, tx);
            }
            if (dto.artists?.add) {
                await addArtists(dto.artists.add, manga.id, tx);
            }
            if (dto.publishers?.add) {
                await addPublishers(dto.publishers.add, manga.id, tx);
            }
            return manga.id;
        });
        return await this.getEditedManga(mangaId, lang);
    }
}
