import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;

  async sendMessage(chatId: string, text: string) {
    if (!this.botToken) {
      this.logger.warn('TELEGRAM_BOT_TOKEN is not set. Bỏ qua việc gửi tin nhắn.');
      return;
    }
    
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });
      
      if (!response.ok) {
        this.logger.error(`Failed to send Telegram message: ${response.statusText}`);
      }
    } catch (error: any) {
      this.logger.error(`Error sending Telegram message: ${error.message}`);
    }
  }
}
