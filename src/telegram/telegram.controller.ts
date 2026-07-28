import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('telegram')
export class TelegramController {
  
  @UseGuards(JwtAuthGuard)
  @Get('bot-info')
  getBotInfo() {
    // Return bot username or link for frontend to use in deep linking
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'DanhGiaBuaAn_Bot';
    return {
      botLink: `https://t.me/${botUsername}`
    };
  }
}
