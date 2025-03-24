import { Controller } from '@nestjs/common';
import { MangaJanresControllerInterface } from './interfaces/mangaJanresController';
import { MangaJanresService } from './mangaJanres.service';

@Controller()
export class MangaJanresController implements MangaJanresControllerInterface {
  constructor(private mangaJanresService: MangaJanresService) {}
}
