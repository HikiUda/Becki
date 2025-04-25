import { AuthUserRequest } from 'src/modules/user/auth';

export interface ChapterActionControllerInterface {
    setUserLikeChapter: (chapterId: number, req: AuthUserRequest) => Promise<void>;
    setUserViewChapter: (chapterId: number, req: AuthUserRequest) => Promise<void>;
}
