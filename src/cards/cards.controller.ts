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
import { CardsService } from './cards.service';
import {CreateCardsDto, ReturnedCardDto} from './dto';
import { UpdateCardDto } from './dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
    constructor(private readonly _cardsService: CardsService) {}

    @ApiOperation({ summary: 'Создание карточки' })
    @ApiCreatedResponse({ type: ReturnedCardDto })
    @Post()
    create(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Body() createCardDto: CreateCardsDto) {
        return this._cardsService.create(userId, columnId, createCardDto);
    }

    @ApiOperation({ summary: 'Поиск всех карточек колонки' })
    @ApiOkResponse({ type: [ReturnedCardDto] })
    @Get()
    findAll(@Param('userId') userId: string,
            @Param('columnId') columnId: string) {
        return this._cardsService.findAll(userId, columnId);
    }

    @ApiOperation({ summary: 'Поиск карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Get(':id')
    findOne(@Param('userId') userId: string,
            @Param('columnId') columnId: string,
            @Param('id') id: string) {
        return this._cardsService.findOne(userId, columnId, id);
    }

    @ApiOperation({ summary: 'Обновление карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Put(':id')
    update(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('id') id: string,
           @Body() updateCardDto: UpdateCardDto) {
        return this._cardsService.update(userId, columnId, id, updateCardDto);
    }

    @ApiOperation({ summary: 'Частичное обновление карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Patch(':id')
    partialUpdate(@Param('userId') userId: string,
                  @Param('columnId') columnId: string,
                  @Param('id') id: string,
                  @Body() updateCardDto: UpdateCardDto) {
        return this._cardsService.partialUpdate(userId, columnId, id, updateCardDto);
    }

    @ApiOperation({ summary: 'Удаление карточки' })
    @ApiOkResponse({ type: ReturnedCardDto })
    @Delete(':id')
    remove(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('id') id: string) {
        return this._cardsService.remove(userId, columnId, id);
    }
}