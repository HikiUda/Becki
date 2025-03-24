import { Injectable } from '@nestjs/common';
import { MangaJanresServiceInterface } from './interfaces/mangaJanresService';
import { MangaJanresRepository } from './mangaJanres.repository';

@Injectable()
export class MangaJanresService implements MangaJanresServiceInterface {
  constructor(private mangaJanresRepository: MangaJanresRepository) {}
}
