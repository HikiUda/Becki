import { Injectable } from '@nestjs/common';
import { MangaGenresServiceInterface } from './interfaces/mangaGenresService';
import { MangaGenresRepository } from './mangaGenres.repository';

@Injectable()
export class MangaGenresService implements MangaGenresServiceInterface {
    constructor(private mangaGenresRepository: MangaGenresRepository) {}
}
