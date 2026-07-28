import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Evaluation } from '@prisma/client';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class EvaluationsService {
  private readonly logger = new Logger(EvaluationsService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService
  ) {}

  async create(data: Prisma.EvaluationUncheckedCreateInput): Promise<Evaluation> {
    const evaluation = await this.prisma.evaluation.create({ data });

    // Find table and kitchen info
    const table = await this.prisma.table.findUnique({
      where: { id: data.tableId },
      include: { kitchen: { include: { managerKitchens: { include: { user: true } } } } }
    });

    if (table && table.kitchen) {
      const kitchenName = table.kitchen.name;
      const tableName = table.tableName;
      
      // Get all active managers of this kitchen with telegramChatId
      const managers = table.kitchen.managerKitchens
        .map(mk => mk.user)
        .filter(u => u.isActive && u.telegramChatId);
        
      // Get all active admins with telegramChatId
      const admins = await this.prisma.user.findMany({
        where: { role: 'ADMIN', isActive: true, telegramChatId: { not: null } }
      });
      
      // Combine and deduplicate by telegramChatId
      const allUsersToNotify = [...managers, ...admins];
      const uniqueChatIds = [...new Set(allUsersToNotify.map(u => u.telegramChatId))];
      
      if (uniqueChatIds.length > 0) {
        const stars = '⭐'.repeat(data.rating);
        const feedbackText = data.feedback ? `\n💬 *Góp ý:* ${data.feedback}` : '';
        const message = `🔔 *Có đánh giá mới!*\n\n🍳 *Bếp:* ${kitchenName}\n🍽 *Bàn:* ${tableName}\n👤 *Họ tên (Đơn vị):* ${data.evaluatorName} (${data.unit})\n⭐️ *Đánh giá:* ${stars} (${data.rating}/5)${feedbackText}`;
        
        uniqueChatIds.forEach(chatId => {
          if (chatId) {
            this.telegramService.sendMessage(chatId, message).catch(err => {
               this.logger.error(`Failed to send telegram to ${chatId}: ${err.message}`);
            });
          }
        });
      }
    }

    return evaluation;
  }

  findAll(tableId?: number, user?: any): Promise<Evaluation[]> {
    const whereClause: any = {};
    if (tableId) {
      whereClause.tableId = tableId;
    }
    if (user && user.role === 'MANAGER') {
      whereClause.table = { kitchen: { managerKitchens: { some: { userId: user.sub } } } };
    }

    return this.prisma.evaluation.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: { table: true }
    });
  }

  findOne(id: number): Promise<Evaluation | null> {
    return this.prisma.evaluation.findUnique({ where: { id }, include: { table: true } });
  }

  remove(id: number): Promise<Evaluation> {
    return this.prisma.evaluation.delete({ where: { id } });
  }
}
