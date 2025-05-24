import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { Role } from '../../user/enums/role.enum';
import { CustomI18nService } from 'src/custom-i18n';

interface JwtPayload {
  id: number;
  userType: string;
}

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private i18n: CustomI18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Role[] = this.reflector.get('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest() as Request & {
      user?: JwtPayload;
    };

    const token = request.headers?.authorization?.split(' ')[1];

    if (!token)
      throw new UnauthorizedException(
        this.i18n.translate('users.tokenRequired'),
      );

    const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    const user = await this.userService.findOne(payload.id);

    if (!roles.includes(user.role))
      throw new UnauthorizedException(
        this.i18n.translate('users.accessDenied'),
      );

    request.user = payload;

    return true;
  }
}
