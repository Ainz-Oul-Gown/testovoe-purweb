import {IsNotEmpty, IsString, MaxLength} from "class-validator";
import {ApiProperty, PartialType} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        description: 'Текст комментария',
        nullable: false,
        example: 'Текст комментария',
    })
    @IsNotEmpty({ message: 'Текст комментария обязателен' })
    @IsString({ message: 'Текст комментария должен быть строкой' })
    @MaxLength(2000, { message: "Комментарий слишком длинный"})
    text: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
}

export class ReturnedCommentsDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    cardId: string;

    @ApiProperty()
    userId: string;
}