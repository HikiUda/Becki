import { Injectable } from '@nestjs/common';
import { ProfileServiceInterface } from './interfaces/profileService';
import { ProfileRepository } from './profile.repository';
import { UserDataDto } from './dto/userData.dto';

@Injectable()
export class ProfileService implements ProfileServiceInterface {
    constructor(private profileRepository: ProfileRepository) {}
    async getUserData(id: number): Promise<UserDataDto> {
        return await this.profileRepository.getUserData(id);
    }
}
