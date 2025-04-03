import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {CreateUsersDto, ReturnedUsersDto} from "../users/dto";
import {ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";


@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiBody({type: LoginDto})
    @ApiResponse({
        status: 201, schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                accessToken: {
                    type: 'string',
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
    @Post('login')
    async signIn(@Body() loginDto: LoginDto) {
        return await this._authService.login(loginDto);
    }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiBody({type: CreateUsersDto})
    @ApiCreatedResponse({type: ReturnedUsersDto})
    @ApiBadRequestResponse({ description: 'Пользователь с таким email уже существует' })
    @Post('sign-up')
    async signUp(@Body() createUserDto: CreateUsersDto){
        return await this._authService.signUp(createUserDto);
    }
}