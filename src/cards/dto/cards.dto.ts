import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {ApiProperty, PartialType} from "@nestjs/swagger";

export class CreateCardsDto {
    @ApiProperty({
        description: 'Заголовок карточки',
        nullable: false,
        example: 'Заголовок',
    })
    @IsNotEmpty({ message: 'Заголовок обязателен' })
    @IsString({ message: 'Заголовок должен быть строкой' })
    @MaxLength(200, { message: "Заголовок слишком длинный"})
    title: string;

    @ApiProperty({
        description: 'Контент карточки',
        nullable: true,
        example: 'Описание',
    })
    @IsOptional()
    @IsString({ message: 'Контент должен быть строкой' })
    @MaxLength(2000, { message: "Контент слишком длинный"})
    content?: string;
}

export class UpdateCardDto extends PartialType(CreateCardsDto) {
}

export class ReturnedCardDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    columnId: string;

    @ApiProperty()
    userId: string;
}