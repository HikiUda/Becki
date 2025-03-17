import { Injectable } from '@nestjs/common';
import { [FTName | capitalize]RepositoryInterface } from './interfaces/[FTName]Repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class [FTName | capitalize]Repository implements [FTName | capitalize]RepositoryInterface {
  constructor(private prisma: PrismaService) {}
}
