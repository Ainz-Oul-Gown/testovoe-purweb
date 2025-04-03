import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CreateCardsDto, UpdateCardDto} from "./dto";

@Injectable()
export class CardsService {
    constructor(private readonly _prismaService: PrismaService) {}

    async create(userId: string, columnId: string, createCardDto: CreateCardsDto) {
        return this._prismaService.card.create({
            data: {
                ...createCardDto,
                user: { connect: { id: userId } },
                column: { connect: { id: columnId } },
            },
        });
    }

    async findAll(columnId: string) {
        return this._prismaService.card.findMany({
            where: {columnId},
        });
    }

    async findOne(columnId: string, id: string) {
        return this._prismaService.card.findFirst({
            where: { id, columnId },
        });
    }


    async update(columnId: string, id: string, updateCardDto: UpdateCardDto) {
        return this._prismaService.card.update({
            where: { id, columnId },
            data: updateCardDto,
        });
    }

    async partialUpdate(columnId: string, id: string, updateCardDto: UpdateCardDto) {
        return this._prismaService.card.update({
            where: { id, columnId },
            data: updateCardDto,
        });
    }

    async remove(columnId: string, id: string) {
        return this._prismaService.card.delete({
            where: { id },
        });
    }
}