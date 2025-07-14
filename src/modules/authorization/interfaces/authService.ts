import { CreateUserDto } from '../dto/createUser.dto';
import { LoginUserDto } from '../dto/loginUser.dto';
import { AuthTokens, RefreshToken } from '../dto/user.dto';

export interface AuthServiceInterface {
    registration: (data: CreateUserDto) => Promise<AuthTokens>;
    login: (data: LoginUserDto) => Promise<AuthTokens>;
    logout: (token: RefreshToken) => Promise<void>;
    refresh: (token: RefreshToken) => Promise<AuthTokens>;
}
