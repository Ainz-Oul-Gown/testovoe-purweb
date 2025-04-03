import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {ColumnsModule} from "./columns/columns.module";
import {CardsModule} from "./cards/cards.module";
import {CommentsModule} from "./comments/comments.module";
import {OwnerGuard} from "./auth/owner.guard";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
