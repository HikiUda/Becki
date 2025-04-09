import { Controller } from '@nestjs/common';
import { MangaGenresControllerInterface } from './interfaces/mangaGenresController';
import { MangaGenresService } from './mangaGenres.service';

@Controller()
export class MangaGenresController implements MangaGenresControllerInterface {
    constructor(private mangaGenresService: MangaGenresService) {}
}
