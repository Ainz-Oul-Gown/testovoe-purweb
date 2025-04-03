import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {CreateColumnDto, UpdateColumnDto} from "./dto";

@Injectable()
export class ColumnsService {
    constructor(private readonly _prismaService: PrismaService) {}

    async create(userId: string, createColumnDto: CreateColumnDto) {
        return this._prismaService.column.create({
            data: {
                ...createColumnDto,
                user: { connect: { id: userId } },
            },
        });
    }

    async findAll(userId: string) {
        return this._prismaService.column.findMany({
            where: { userId }
        });
    }

    async findOne (id: string, userId: string) {
        return await this._prismaService.column.findFirst({
            where: { id, userId },
        });
    }


    async update(userId: string, id: string, updateColumnDto: UpdateColumnDto) {
        return this._prismaService.column.update({
            where: { id },
            data: updateColumnDto,
        });
    }

    async partialUpdate(userId: string, id: string, updateColumnDto: UpdateColumnDto) {
        return this._prismaService.column.update({
            where: { id },
            data: updateColumnDto,
        });
    }

    async remove(userId: string, id: string) {
        return this._prismaService.column.delete({
            where: { id, userId }
        });
    }

}
