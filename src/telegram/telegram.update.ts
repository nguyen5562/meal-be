import { Update, Ctx, Start } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Update()
export class TelegramUpdate {
  private readonly logger = new Logger(TelegramUpdate.name);

  constructor(private readonly prisma: PrismaService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const payload = (ctx.message as any)?.text?.split(' ')[1]; // Extract payload from "/start payload"
    const chatId = ctx.from?.id?.toString();

    if (!payload) {
      await ctx.reply('Xin chào! Tôi là Q-Meal Bot. Vui lòng sử dụng tính năng "Kết nối Telegram" từ trang Quản trị để liên kết tài khoản.');
      return;
    }

    if (!chatId) {
      await ctx.reply('Lỗi: Không thể lấy ID Telegram của bạn.');
      return;
    }

    try {
      const userId = parseInt(payload, 10);
      if (isNaN(userId)) {
        await ctx.reply('Mã liên kết không hợp lệ.');
        return;
      }

      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        await ctx.reply('Không tìm thấy tài khoản để liên kết.');
        return;
      }

      // Update user with telegramChatId
      await this.prisma.user.update({
        where: { id: userId },
        data: { telegramChatId: chatId },
      });

      this.logger.log(`Linked User ${user.username} (ID: ${user.id}) with Telegram Chat ID: ${chatId}`);
      await ctx.reply(`✅ Liên kết thành công!\n\nTài khoản **${user.username}** của bạn đã được kết nối với Telegram. Hệ thống sẽ gửi thông báo (bữa ăn, đánh giá) trực tiếp vào đây.`, { parse_mode: 'Markdown' });
    } catch (error: any) {
      this.logger.error(`Error linking telegram account: ${error.message}`);
      await ctx.reply('Đã xảy ra lỗi trong quá trình liên kết. Vui lòng thử lại sau.');
    }
  }
}
