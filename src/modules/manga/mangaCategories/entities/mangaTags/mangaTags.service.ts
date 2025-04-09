import { Injectable } from '@nestjs/common';
import { MangaTagsServiceInterface } from './interfaces/mangaTagsService';
import { MangaTagsRepository } from './mangaTags.repository';

@Injectable()
export class MangaTagsService implements MangaTagsServiceInterface {
  constructor(private mangaTagsRepository: MangaTagsRepository) {}
}
