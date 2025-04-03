import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from "../users/dto/";

class _userData {
    id: string;
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async login(loginDto: LoginDto) {
        const user: _userData  = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Неверные учетные данные');
        }

        const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Неверные учетные данные');
        }

        const payload = { sub: user.id, email: user.email };
        delete user.password;
        return {
            ...user,
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(createUserDto:CreateUsersDto) {
        return await this.usersService.create(createUserDto);
    }
}


