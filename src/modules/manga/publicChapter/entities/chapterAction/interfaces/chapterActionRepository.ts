export interface ChapterActionRepositoryInterface {
    setUserLikeChapter: (chapterId: number, userId: number) => Promise<void>;
    setUserViewChapter: (chapterId: number, userId: number) => Promise<void>;
}
