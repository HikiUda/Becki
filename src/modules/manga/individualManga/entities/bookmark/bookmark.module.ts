import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository, PrismaService],
})
export class BookmarkModule {}
