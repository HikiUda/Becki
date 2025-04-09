import { Controller } from '@nestjs/common';
import { MangaTagsControllerInterface } from './interfaces/mangaTagsController';
import { MangaTagsService } from './mangaTags.service';

@Controller()
export class MangaTagsController implements MangaTagsControllerInterface {
  constructor(private mangaTagsService: MangaTagsService) {}
}
