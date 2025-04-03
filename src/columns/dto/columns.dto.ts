import {IsNotEmpty, IsString, MaxLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';


export class CreateColumnDto {
    @ApiProperty({
        description: 'Заголовок колонки',
        nullable: false,
        example: 'Заголовок колонки',
    })
    @IsNotEmpty({ message: 'Заголовок обязателен' })
    @IsString({ message: 'Заголовок должен быть строкой' })
    @MaxLength(60, { message: "Заголовок слишком длинный"})
    title: string;
}

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
    @ApiProperty({
        description: 'Id колонки',
        nullable: false,
        example: 'dfklajdlfjaldjfa',
    })
    id: string;
}

export class ReturnedColumnDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    userId: string;
}