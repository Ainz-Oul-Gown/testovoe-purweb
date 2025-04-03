import {Module} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CommentsService} from "./comments.service";
import {CommentsController} from "./comments.controller";
import {OwnerGuard} from "../auth/owner.guard";

@Module({
    providers: [PrismaService, CommentsService, OwnerGuard],
    controllers: [CommentsController],
    exports: [CommentsService],
})
export class CommentsModule {}