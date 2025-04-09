import { Injectable } from '@nestjs/common';
import { MangaGenresRepositoryInterface } from './interfaces/mangaGenresRepository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MangaGenresRepository implements MangaGenresRepositoryInterface {
    constructor(private prisma: PrismaService) {}
}
