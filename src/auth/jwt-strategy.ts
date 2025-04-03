import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PrismaService} from '../../prisma/prisma.service';
import * as process from "process";
import {CreateUsersDto} from "../users/dto/";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _configService: ConfigService,
        private readonly _prismaService: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "secret",
        } as any);
    }

    async validate(payload: any): Promise<CreateUsersDto> {
        const user = await this._prismaService.user.findUnique({ where: { id: payload.sub } });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
