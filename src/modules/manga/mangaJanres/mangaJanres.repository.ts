import { Injectable } from '@nestjs/common';
import { MangaJanresRepositoryInterface } from './interfaces/mangaJanresRepository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MangaJanresRepository implements MangaJanresRepositoryInterface {
  constructor(private prisma: PrismaService) {}
}
