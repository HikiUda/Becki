import { ApiProperty } from '@nestjs/swagger';

export class Person {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: 'string', nullable: true })
    avatar: string | null;
    @ApiProperty()
    otherNames: string[];
    @ApiProperty()
    description: string;
}
