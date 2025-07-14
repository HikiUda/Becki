import { Injectable } from '@nestjs/common';
import { ProfileServiceInterface } from './interfaces/profileService';
import { ProfileRepository } from './profile.repository';
import { UserDataDto } from './dto/userData.dto';
import { UserId } from 'src/modules/authorization';

@Injectable()
export class ProfileService implements ProfileServiceInterface {
    constructor(private repository: ProfileRepository) {}

    async getUserData(userId: UserId): Promise<UserDataDto> {
        return await this.repository.getUserData(userId);
    }

    async updateJsonSettings(userId: UserId, data: object): Promise<void> {
        const jsonSettings = await this.repository.getJsonSettings(userId);
        await this.repository.setJsonSettings(userId, { ...(jsonSettings || {}), ...data });
        return;
    }
}
