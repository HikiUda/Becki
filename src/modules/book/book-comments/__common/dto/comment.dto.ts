import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/dto/pagination.dto';

export class Comment {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ nullable: true })
    parentId: number | null;

    @ApiProperty({ type: 'number', nullable: true })
    userId: number | null;
}

export class CommentUser {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ nullable: true })
    avatar: string | null;
}

export class CommentList extends Pagination<Comment> {
    @ApiProperty({ type: [Comment] })
    data: Comment[];
    @ApiProperty({ type: [CommentUser] })
    users: CommentUser[];
}
