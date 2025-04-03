import {CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {PrismaService} from '../../prisma/prisma.service';
import {Request} from 'express';
import {User} from "@prisma/client";

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(
        private readonly _reflector: Reflector,
        private readonly _prismaService: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as User;

        const ownerParams = this._reflector.getAllAndOverride<string[]>('ownerParam', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!ownerParams || ownerParams.length === 0) {
            return true;
        }

        const [ownerIdParam, entityName] = ownerParams;

        const ownerId = request.params[ownerIdParam];
        if (!ownerId) {
            return true;
        }

        const entity = await this._prismaService[entityName].findUnique({where: {id: ownerId}});

        if (!entity || entity.userId !== user.id) {
            throw new ForbiddenException('У вас нет прав на это действие');
        }

        return true;
    }
}

export const Owner = (...params: string[]) => SetMetadata('ownerParam', params);