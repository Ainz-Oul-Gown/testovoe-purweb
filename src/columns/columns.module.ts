import {Module} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {ColumnsService} from "./columns.service";
import {ColumnsController} from "./columns.controller";

@Module({
    providers: [ColumnsService, PrismaService],
    controllers: [ColumnsController],
    exports: [ColumnsService]
})
export class ColumnsModule {}