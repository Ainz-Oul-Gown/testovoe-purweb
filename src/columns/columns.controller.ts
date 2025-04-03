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
import { ColumnsService } from './columns.service';
import {CreateColumnDto, ReturnedColumnDto} from './dto';
import { UpdateColumnDto } from './dto';
import {AuthGuard} from "@nestjs/passport";
import {Owner, OwnerGuard} from "../auth/owner.guard";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnerGuard)
@Controller('users/:userId/columns')
export class ColumnsController {
    constructor(private readonly _columnsService: ColumnsService) {}

    @ApiOperation({ summary: 'Создание колонки' })
    @ApiCreatedResponse({ type: ReturnedColumnDto })
    @Post()
    create(@Param('userId') userId: string,
           @Body() createColumnDto: CreateColumnDto) {
        return this._columnsService.create(userId, createColumnDto);
    }

    @ApiOperation({ summary: 'Поиск всех колонок пользователя' })
    @ApiOkResponse({ type: [ReturnedColumnDto] })
    @Get()
    findAll(@Param('userId') userId: string) {
        return this._columnsService.findAll(userId);
    }

    @ApiOperation({ summary: 'Поиск колонки' })
    @ApiOkResponse({ type: ReturnedColumnDto })
    @Get(':id')
    findOne(@Param('userId') userId: string,
            @Param('id') id: string) {
        return this._columnsService.findOne(userId, id);
    }

    @ApiOperation({ summary: 'Обновление колонки' })
    @ApiOkResponse({ type: ReturnedColumnDto })
    @Owner('id')
    @Put(':id')
    update(@Param('userId') userId: string,
           @Param('id') id: string,
           @Body() updateColumnDto: UpdateColumnDto) {
        return this._columnsService.update(userId, id, updateColumnDto);
    }

    @ApiOperation({ summary: 'Частичное обновление колонки' })
    @ApiOkResponse({ type: ReturnedColumnDto })
    @Owner('id')
    @Patch(':id')
    partialUpdate(@Param('userId') userId: string,
                  @Param('id') id: string,
                  @Body() updateColumnDto: UpdateColumnDto) {
        return this._columnsService.partialUpdate(userId, id, updateColumnDto);
    }

    @ApiOperation({ summary: 'Удаление колонки' })
    @ApiOkResponse({ type: ReturnedColumnDto })
    @Owner('id')
    @Delete(':id')
    remove(@Param('userId') userId: string,
           @Param('id') id: string) {
        return this._columnsService.remove(userId, id);
    }
}