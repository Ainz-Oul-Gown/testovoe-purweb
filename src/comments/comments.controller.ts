import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {CommentsService} from './comments.service';
import {CreateCommentDto, ReturnedCommentsDto, UpdateCommentDto} from './dto';
import {AuthGuard} from "@nestjs/passport";
import {Owner, OwnerGuard} from "../auth/owner.guard";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnerGuard)
@Controller('cards/:cardId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Создание комментария' })
    @ApiCreatedResponse({type: ReturnedCommentsDto})
    @Post()
    create(@Param('cardId') cardId: string,
           @Query('userId') userId: string,
           @Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(userId, cardId, createCommentDto);
    }

    @ApiOperation({ summary: 'Поиск всех комментариев карточки' })
    @ApiOkResponse({type: [ReturnedCommentsDto]})
    @Get()
    findAll(@Param('columnId') columnId: string,
            @Param('cardId') cardId: string) {
        return this.commentsService.findAll(cardId);
    }

    @ApiOperation({ summary: 'Поиск комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Get(':id')
    findOne(@Param('columnId') columnId: string,
            @Param('cardId') cardId: string,
            @Param('id') id: string) {
        return this.commentsService.findOne(cardId, id);
    }

    @ApiOperation({ summary: 'Обновление комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Owner('id', 'comment')
    @Put(':id')
    update(@Param('columnId') columnId: string,
           @Param('cardId') cardId: string,
           @Param('id') id: string,
           @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(cardId, id, updateCommentDto);
    }

    @ApiOperation({ summary: 'Частичное изменение комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Owner('id', 'comment')
    @Patch(':id')
    partialUpdate(@Param('columnId') columnId: string,
                  @Param('cardId') cardId: string,
                  @Param('id') id: string,
                  @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.partialUpdate(cardId, id, updateCommentDto);
    }

    @ApiOperation({ summary: 'Удаление комментария' })
    @ApiOkResponse({type: ReturnedCommentsDto})
    @Owner('id', 'comment')
    @Delete(':id')
    remove(@Param('columnId') columnId: string,
           @Param('cardId') cardId: string,
           @Param('id') id: string) {
        return this.commentsService.remove(cardId, id);
    }
}