import { Module } from '@nestjs/common';
import { UserMangaChapterActionsModule } from './manga/userMangaChapterActions.module';
import { UserRanobeChapterActionsModule } from './ranobe/userRanobeChapterActions.module';

@Module({
    imports: [UserMangaChapterActionsModule, UserRanobeChapterActionsModule],
})
export class UserChapterActionsModule {}
