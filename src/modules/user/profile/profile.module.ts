import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository, PrismaService],
})
export class ProfileModule {}
