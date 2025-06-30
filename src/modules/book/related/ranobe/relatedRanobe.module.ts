import { Module } from '@nestjs/common';
import { RelatedRanobeController } from './relatedRanobe.controller';
import { RelatedBookRepository } from '../__common/relatedBook.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { RelatedRanobeService } from './relatedRanobe.service';
import { RelatedRanobeRepository } from './relatedRanobe.repository';

@Module({
    imports: [],
    controllers: [RelatedRanobeController],
    providers: [
        RelatedRanobeService,
        RelatedRanobeRepository,
        RelatedBookRepository,
        PrismaService,
    ],
})
export class RelatedRanobeModule {}
