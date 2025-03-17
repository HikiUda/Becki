import { Module } from '@nestjs/common';

import { MangaModule } from './modules/manga/manga.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MangaModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
