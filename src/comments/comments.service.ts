import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateCommentDto, UpdateCommentDto} from './dto';

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

    async findAll(cardId: string) {
        return this._prismaService.comment.findMany({
            where: { cardId }
        });
    }

    async findOne(cardId: string, id: string) {
        return this._prismaService.comment.findFirst({
            where: { id, cardId }
        });
    }

    async update(cardId: string, id: string, updateCommentDto: UpdateCommentDto) {
        return this._prismaService.comment.update({
            where: {id, cardId},
            data: updateCommentDto,
        });
    }


    async partialUpdate(cardId: string, id: string, updateCommentDto: UpdateCommentDto) {
        return this._prismaService.comment.update({
            where: {id, cardId},
            data: updateCommentDto,
        });
    }


    async remove(cardId: string, id: string) {
        return this._prismaService.comment.delete({
            where: {id, cardId}
        });
    }
}