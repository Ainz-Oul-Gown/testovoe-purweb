import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {ApiProperty, PartialType} from "@nestjs/swagger";

export class CreateUsersDto {
    @ApiProperty({
        description: 'Имя пользователя',
        nullable: false,
        example: 'Владислав',
    })
    @IsNotEmpty({ message: 'Имя обязательно' })
    @IsString({ message: 'Имя должно быть строкой' })
    @MaxLength(50, { message: "Имя слишком длинное"})
    name: string;

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

export class UpdateUserDto extends PartialType(CreateUsersDto) {
}

export class ReturnedUsersDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}