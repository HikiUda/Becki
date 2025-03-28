import { Length } from 'class-validator';

export class CreateUserDto {
    @Length(1, 64)
    login: string;
    //TODO strong password
    @Length(10, 24)
    password: string;
}
