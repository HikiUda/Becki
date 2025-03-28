import { Response } from 'express';
import { CreateUserDto } from '../dto/createUser.dto';
import { ReturnAuthUser } from '../types/user';
import { LoginUserDto } from '../dto/loginUser.dto';

export interface AuthControllerInterface {
    registration: (dto: CreateUserDto, res: Response) => Promise<ReturnAuthUser>;
    login: (dto: LoginUserDto, res: Response) => Promise<ReturnAuthUser>;
    logout: (refresh: string, res: Response) => Promise<any>;
    refresh: (refresh: string, res: Response) => Promise<ReturnAuthUser>;
}
