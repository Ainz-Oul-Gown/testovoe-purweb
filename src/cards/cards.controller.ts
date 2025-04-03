import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {CardsService} from './cards.service';
import {CreateCardsDto, ReturnedCardDto, UpdateCardDto} from './dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {Owner, OwnerGuard} from "../auth/owner.guard";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnerGuard)
@Controller('columns/:columnId/cards')
export class CardsController {
    constructor(private readonly _cardsService: CardsService) {}

    @ApiOperation({ summary: 'Создание карточки' })
    @ApiCreatedResponse({ type: ReturnedCardDto })
    @Post()
    create(@Param('columnId') columnId: string,
           @Query('userId') userId: string,
           @Body() createCardDto: CreateCardsDto) {
        return this._cardsService.create(userId, columnId, createCardDto);
    }

    @ApiOperation({ summary: 'Поиск всех карточек колонки' })
    @ApiOkResponse({ type: [ReturnedCardDto] })
    @Get()
    findAll(@Param('columnId') columnId: string) {
        return this._cardsService.findAll(columnId);
    }

    @ApiOperation({ summary: 'Поиск карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Get(':id')
    findOne(@Param('columnId') columnId: string,
            @Param('id') id: string) {
        return this._cardsService.findOne(columnId, id);
    }

    @ApiOperation({ summary: 'Обновление карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Owner('id', 'card')
    @Put(':id')
    update(@Param('columnId') columnId: string,
           @Param('id') id: string,
           @Body() updateCardDto: UpdateCardDto) {
        return this._cardsService.update(columnId, id, updateCardDto);
    }

    @ApiOperation({ summary: 'Частичное обновление карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Owner('id', 'card')
    @Patch(':id')
    partialUpdate(@Param('columnId') columnId: string,
                  @Param('id') id: string,
                  @Body() updateCardDto: UpdateCardDto) {
        return this._cardsService.partialUpdate(columnId, id, updateCardDto);
    }

    @ApiOperation({ summary: 'Удаление карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Owner('id', 'card')
    @Delete(':id')
    remove(@Param('columnId') columnId: string,
           @Param('id') id: string) {
        return this._cardsService.remove(columnId, id);
    }
}