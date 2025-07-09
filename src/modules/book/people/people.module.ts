import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleRepository } from './people.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [PeopleController],
    providers: [PeopleService, PeopleRepository, PrismaService],
})
export class PeopleModule {}
