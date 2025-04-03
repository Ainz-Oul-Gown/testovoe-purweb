import {Module} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";

@Module({
    imports: [],
    providers: [PrismaService, UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}