import { Module } from '@nestjs/common';
import { [FTName | capitalize]Controller } from './[FTName].controller';
import { [FTName | capitalize]Repository } from './[FTName].repository';
import { [FTName | capitalize]Service } from './[FTName].service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [[FTName | capitalize]Controller],
  providers: [[FTName | capitalize]Service, [FTName | capitalize]Repository, PrismaService],
})
export class [FTName | capitalize]Module {}
