import {Module} from "@nestjs/common";
import {CardsService} from "./cards.service";
import {CardsController} from "./cards.controller";
import {PrismaService} from "../../prisma/prisma.service";

@Module({
    providers: [CardsService, PrismaService],
    controllers: [CardsController],
    exports: [CardsService],
})
export class CardsModule {}