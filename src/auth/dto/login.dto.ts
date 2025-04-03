import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'Почта пользователя',
        nullable: false,
        example: 'example@email.com',
    })
    @IsNotEmpty({ message: 'Email обязателен' })
    @IsEmail({}, { message: 'Неверный формат email' })
    @MaxLength(200, { message: "Email слишком длинный"})
    email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        nullable: false,
        example: '45Yte!',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: "Пароль слишком короткий"})
    @MaxLength(20, { message: "Пароль слишком длинный"})
    password: string;
}