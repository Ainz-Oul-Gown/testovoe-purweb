import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCommentDto } from './dto';
import { UpdateCommentDto } from './dto';

@Injectable()
export class CommentsService {
    constructor(private readonly _prismaService: PrismaService) {}

    async create(userId: string, cardId: string, createCommentDto: CreateCommentDto) {
        return this._prismaService.comment.create({
            data: {
                ...createCommentDto,
                user: { connect: { id: userId } },
                card: { connect: { id: cardId } },
            },
        });
    }

    async findAll(userId: string, cardId: string) {
        return this._prismaService.comment.findMany({
            where: { cardId }
        });
    }

    async findOne(userId: string, cardId: string, id: string) {
        return this._prismaService.comment.findFirst({
            where: { id, cardId }
        });
    }

    async update(userId: string, cardId: string, id: string, updateCommentDto: UpdateCommentDto) {
        return this._prismaService.comment.update({
            where: { id },
            data: updateCommentDto,
        });
    }


    async partialUpdate(userId: string, cardId: string, id: string, updateCommentDto: UpdateCommentDto) {
        return this._prismaService.comment.update({
            where: { id },
            data: updateCommentDto,
        });
    }


    async remove(userId: string, cardId: string, id: string) {
        return this._prismaService.comment.delete({
            where: { id }
        });
    }
}