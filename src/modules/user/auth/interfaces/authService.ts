import { CreateUserDto } from '../dto/createUser.dto';
import { LoginUserDto } from '../dto/loginUser.dto';
import { AuthUserDto, ReturnAuthUser } from '../types/user';

export interface AuthServiceInterface {
    registration: (dto: CreateUserDto) => Promise<ReturnAuthUser>;
    login: (dto: LoginUserDto) => Promise<ReturnAuthUser>;
    logout: (refresh: string) => Promise<any>;
    generateSaveTokenAndReturnAuthUser: (user: AuthUserDto) => Promise<ReturnAuthUser>;
    refresh: (refresh: string) => Promise<ReturnAuthUser>;
}
