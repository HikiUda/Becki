import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepositoryInterface } from './interfaces/profileRepository';
import { UserDataDto } from './dto/userData.dto';
import { getUserData } from './prisma/getUserData';

@Injectable()
export class ProfileRepository implements ProfileRepositoryInterface {
    constructor() {}
    async getUserData(id: number): Promise<UserDataDto> {
        const user = await getUserData(id);
        if (!user) throw new BadRequestException('Такого пользователя не существует');
        return user;
    }
}
