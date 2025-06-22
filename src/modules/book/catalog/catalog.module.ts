import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CatalogService } from './catalog.service';
import { CatalogRepository } from './catalog.repository';
import { CatalogController } from './catalog.controller';

@Module({
    imports: [],
    controllers: [CatalogController],
    providers: [PrismaService, CatalogService, CatalogRepository],
})
export class CatalogModule {}
