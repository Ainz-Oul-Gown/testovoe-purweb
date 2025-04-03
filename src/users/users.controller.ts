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
import { UsersService } from './users.service';
import {CreateUsersDto, ReturnedUsersDto} from './dto';
import { UpdateUserDto } from './dto';
import { AuthGuard } from "@nestjs/passport";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiCreatedResponse({ type: ReturnedUsersDto })
    @Post()
    create(@Body() createUserDto: CreateUsersDto) {
        return this._usersService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Поиск всех пользователей' })
    @ApiOkResponse({ type: [ReturnedUsersDto] })
    @Get()
    findAll() {
        return this._usersService.findAll();
    }

    @ApiOperation({ summary: 'Поиск пользователя' })
    @ApiOkResponse({ type: ReturnedUsersDto })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this._usersService.findOne(id);
    }

    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiOkResponse({ type: ReturnedUsersDto })
    @Put(':id')
    update(@Param('id') id: string,
           @Body() updateUserDto: UpdateUserDto) {
        return this._usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Выборочное обновление пользователя' })
    @ApiOkResponse({ type: ReturnedUsersDto })
    @Patch(':id')
    partialUpdate(@Param('id') id: string,
                  @Body() updateUserDto: UpdateUserDto) {
        return this._usersService.partialUpdate(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiOkResponse({ type: ReturnedUsersDto })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this._usersService.remove(id);
    }
}