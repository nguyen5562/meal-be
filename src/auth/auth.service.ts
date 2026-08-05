import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    
    const payload = { sub: user.id, username: user.username, role: user.role };
    
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.accessSecret,
      expiresIn: '15m',
    });
    
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      
      const newPayload = { sub: payload.sub, username: payload.username, role: payload.role };
      const access_token = await this.jwtService.signAsync(newPayload, {
        secret: jwtConstants.accessSecret,
        expiresIn: '15m',
      });
      
      return {
        access_token,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
  }
}
