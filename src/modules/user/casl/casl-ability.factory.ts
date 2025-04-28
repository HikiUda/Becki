import {
    AbilityBuilder,
    createMongoAbility,
    ExtractSubjectType,
    InferSubjects,
    MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { AuthUserDto } from '../auth/types/user';
import { CaslAction, CaslActionType } from './const/action';

class Manga {
    id: number;
}

type Subjects = InferSubjects<typeof Manga | AuthUserDto> | 'all';

export type AppAbility = MongoAbility<[CaslActionType, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: AuthUserDto) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
