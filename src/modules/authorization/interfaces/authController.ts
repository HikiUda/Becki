import { Response } from 'express';
import { CreateUserDto } from '../dto/createUser.dto';
import { RefreshToken, ResponseAccessToken } from '../dto/user.dto';
import { LoginUserDto } from '../dto/loginUser.dto';

export interface AuthControllerInterface {
    registration: (body: CreateUserDto, res: Response) => Promise<ResponseAccessToken>;
    login: (body: LoginUserDto, res: Response) => Promise<ResponseAccessToken>;
    logout: (token: RefreshToken, res: Response) => Promise<void>;
    refresh: (token: RefreshToken, res: Response) => Promise<ResponseAccessToken>;
}
