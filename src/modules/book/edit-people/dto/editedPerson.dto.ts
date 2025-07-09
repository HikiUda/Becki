import { ApiProperty } from '@nestjs/swagger';
import { PeopleRole } from '@prisma/client';

export class EditedPersonDescription {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
}

export class EditedPerson {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    otherNames: string[];
    @ApiProperty({ type: 'string', nullable: true })
    avatar: string | null;
    @ApiProperty()
    description: EditedPersonDescription;
    @ApiProperty({ enum: PeopleRole, isArray: true })
    role: PeopleRole[];
}
