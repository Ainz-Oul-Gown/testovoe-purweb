import { HttpException, Injectable } from "@nestjs/common";
import { CreateUsersDto, UpdateUserDto } from "./dto";
import { PrismaService } from "../../prisma/prisma.service";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

class userData {
    id: string;
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly _userData = {
    id: true,
    name: true,
    email:true,
    password: false,
}
    constructor(private readonly _prismaService: PrismaService) {}

    async create (createUserDto: CreateUsersDto): Promise<userData> {
        try {
            if (!createUserDto.email || !createUserDto.password) {
                throw new HttpException("Нет необходимых полей", 400);
            }
            const user = await this._prismaService.user.findUnique({
                where: { email: createUserDto.email }
            })
            if (user){
                throw new HttpException("Пользователь с таким email уже есть", 400);
            }
            createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
            return await this._prismaService.user.create({
                data: createUserDto,
                select: this._userData
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
                throw new HttpException("Некорректные данные", 400);
            }
            if (error instanceof HttpException){
                throw error;
            }
            console.log(error);
            throw new HttpException("Ошибка сервера", 500);
        }
    }

    async findOne (id: string) {
        return await this._prismaService.user.findUnique({
            where: { id },
            select: this._userData,
        });
    }

    async findAll () {
        return await this._prismaService.user.findMany({
            select: this._userData,
        });
    }

    async findByEmail (email: string): Promise<userData> {
        return await this._prismaService.user.findUnique({
            where: { email: email }
        });
    }

    async update (id: string, updateUserDto: UpdateUserDto) {
        return await this._prismaService.user.update({
            where: { id },
            data: updateUserDto,
            select: this._userData,
        });
    }

    async partialUpdate(id: string, updateUserDto: UpdateUserDto) {
        return this._prismaService.user.update({
            where: { id },
            data: updateUserDto,
            select: this._userData,
        });
    }

    async remove (id: string) {
        return await this._prismaService.user.delete({
            where: { id },
            select: this._userData,
        });
    }
}