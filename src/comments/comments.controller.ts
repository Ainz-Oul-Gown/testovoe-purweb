import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put, UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {CreateCommentDto, ReturnedCommentsDto} from './dto';
import { UpdateCommentDto } from './dto';
import {AuthGuard} from "@nestjs/passport";
import {Owner, OwnerGuard} from "../auth/owner.guard";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnerGuard)
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Создание комментария' })
    @ApiCreatedResponse({type: ReturnedCommentsDto})
    @Post()
    create(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('cardId') cardId: string,
           @Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(userId, cardId, createCommentDto);
    }

    @ApiOperation({ summary: 'Поиск всех комментариев карточки' })
    @ApiOkResponse({type: [ReturnedCommentsDto]})
    @Get()
    findAll(@Param('userId') userId: string,
            @Param('columnId') columnId: string,
            @Param('cardId') cardId: string) {
        return this.commentsService.findAll(userId, cardId);
    }

    @ApiOperation({ summary: 'Поиск комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Get(':id')
    findOne(@Param('userId') userId: string,
            @Param('columnId') columnId: string,
            @Param('cardId') cardId: string,
            @Param('id') id: string) {
        return this.commentsService.findOne(userId, cardId, id);
    }

    @ApiOperation({ summary: 'Обновление комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Owner('id')
    @Put(':id')
    update(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('cardId') cardId: string,
           @Param('id') id: string,
           @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(userId, cardId, id, updateCommentDto);
    }

    @ApiOperation({ summary: 'Частичное изменение комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Owner('id')
    @Patch(':id')
    partialUpdate(@Param('userId') userId: string,
                  @Param('columnId') columnId: string,
                  @Param('cardId') cardId: string,
                  @Param('id') id: string,
                  @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.partialUpdate(userId, cardId, id, updateCommentDto);
    }

    @ApiOperation({ summary: 'Удаление комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Owner('id')
    @Delete(':id')
    remove(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('cardId') cardId: string,
           @Param('id') id: string) {
        return this.commentsService.remove(userId, cardId, id);
    }
}