import { Injectable, NotFoundException } from '@nestjs/common';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { toEditedBookDto } from '../__common/prisma/toEditedBookDto';
import { getEditedBookCategories } from '../__common/prisma/getEditedBookCategories';
import { MutateRanobeDto } from './dto/mutateRanobe.dto';
import { EditedRanobeDto } from './dto/editedRanobe.dto';
import { updateRanobe } from './prisma/updateRanobe';
import { getEditedRanobe } from './prisma/getEditedRanobe';
import { createRanobe } from './prisma/createRanobe';
import { EditBookRepositoryInterface } from '../__common/interfaces/editMangaRepository';

@Injectable()
export class EditRanobeRepository implements EditBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedBook(ranobeId: number, lang: LangType): Promise<EditedRanobeDto> {
        const data = await getEditedRanobe(this.prisma, ranobeId);
        if (!data) throw new NotFoundException('Такого тайтла не существует.');
        const categories = await getEditedBookCategories(this.prisma, {
            genresIds: data.genres,
            tagsIds: data.tags,
            lang,
        });
        const ranobe = toEditedBookDto(data, categories);
        return ranobe;
    }

    async createBook(dto: MutateRanobeDto): Promise<number> {
        return await createRanobe(this.prisma, dto);
    }

    async updateBook(
        dto: MutateRanobeDto,
        ranobeId: number,
        lang: LangType,
    ): Promise<EditedRanobeDto> {
        await updateRanobe(this.prisma, dto, ranobeId);
        return await this.getEditedBook(ranobeId, lang);
    }

    async addCover(cover: string, ranobeId: number): Promise<void> {
        await this.prisma.ranobeCovers.create({
            data: {
                cover,
                main: true,
                bookId: ranobeId,
            },
        });
        return;
    }

    async getBookBanner(ranobeId: number): Promise<string | null> {
        const ranobe = await this.prisma.ranobe.findUnique({
            where: { id: ranobeId },
            select: { banner: true },
        });
        if (!ranobe) return null;
        return ranobe.banner;
    }
}
