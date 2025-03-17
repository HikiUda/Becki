import { Injectable } from '@nestjs/common';
import { MutateMangaServiceInterface } from './interfaces/mutateMangaService';
import { MutateMangaRepository } from './mutateManga.repository';
import { toMangaCreateInput } from './dto/createManga.dto';
import { MangaDto } from '../common/dto/manga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';

@Injectable()
export class MutateMangaService implements MutateMangaServiceInterface {
    constructor(private mutateMangaRepository: MutateMangaRepository) {}
    // TODO  remove as MangaDto
    async createManga(dto: MutateMangaDto): Promise<MangaDto> {
        const handledDto = toMangaCreateInput(dto);
        const data = await this.mutateMangaRepository.createManga(handledDto);
        return data as unknown as MangaDto;
    }
}
