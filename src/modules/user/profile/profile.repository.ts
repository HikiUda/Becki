import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepositoryInterface } from './interfaces/profileRepository';
import { UserDataDto } from './dto/userData.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/authorization';

@Injectable()
export class ProfileRepository implements ProfileRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getUserData(userId: UserId): Promise<UserDataDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, avatar: true, jsonSettings: true },
        });
        if (!user) throw new BadRequestException('Такого пользователя не существует');
        return user;
    }

    async getJsonSettings(userId: UserId): Promise<object | null> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { jsonSettings: true },
        });

        return user && (user.jsonSettings as object);
    }

    async setJsonSettings(userId: UserId, data: object): Promise<void> {
        await this.prisma.user.update({ where: { id: userId }, data: { jsonSettings: data } });
    }
}
