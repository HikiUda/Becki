import { Injectable } from '@nestjs/common';
import { MangaTagsRepositoryInterface } from './interfaces/mangaTagsRepository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MangaTagsRepository implements MangaTagsRepositoryInterface {
  constructor(private prisma: PrismaService) {}
}
