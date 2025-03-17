import { Body, Controller, Post } from '@nestjs/common';
import { MutateMangaControllerInterface } from './interfaces/mutateMangaController';
import { MutateMangaService } from './mutateManga.service';
import { MangaDto } from '../common/dto/manga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';

@Controller('manga')
export class MutateMangaController implements MutateMangaControllerInterface {
    constructor(private mutateMangaService: MutateMangaService) {}
    @Post()
    async createManga(@Body() body: MutateMangaDto): Promise<MangaDto> {
        return await this.mutateMangaService.createManga(body);
    }
}
