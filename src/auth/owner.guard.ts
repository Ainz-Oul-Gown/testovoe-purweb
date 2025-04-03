import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';
import { User } from "@prisma/client";

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(
        private readonly _reflector: Reflector,
        private readonly _prismaService: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as User;

        const params = this._reflector.getAllAndOverride<string[]>('ownerParam', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!params || params.length === 0) {
            return true;
        }

        for (const param of params) {
            const ownerId = request.params[param];
            if (!ownerId) {
                return true;
            }

            let entity;
            const parts = request.route.path.split('/');

            switch (parts[3]) {
                case 'columns':
                    entity = await this._prismaService.column.findUnique({ where: { id: ownerId } });
                    break;
                case 'cards':
                    entity = await this._prismaService.card.findUnique({ where: { id: ownerId } });
                    break;
                case 'comments':
                    entity = await this._prismaService.comment.findUnique({ where: { id: ownerId } });
                    break;
                default:
                    return true;
            }

            if (!entity || entity.userId !== user.id) {
                throw new ForbiddenException('У вас нет прав на это действие');
            }
        }

        return true;
    }
}

export const Owner = (...params: string[]) => SetMetadata('ownerParam', params);