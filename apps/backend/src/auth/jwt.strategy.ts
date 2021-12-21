import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ApolloError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoggedinUser } from '../user/decorators/user.decorator';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<LoggedinUser> {
    const user = await this.authService.validateUser(payload.ethAddress);
    if (!user) {
      throw new ApolloError('UNAUTHORIZED');
    }
    return user;
  }
}
