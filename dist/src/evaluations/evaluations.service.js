"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EvaluationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const telegram_service_1 = require("../telegram/telegram.service");
let EvaluationsService = EvaluationsService_1 = class EvaluationsService {
    prisma;
    telegramService;
    logger = new common_1.Logger(EvaluationsService_1.name);
    constructor(prisma, telegramService) {
        this.prisma = prisma;
        this.telegramService = telegramService;
    }
    async create(data) {
        const evaluation = await this.prisma.evaluation.create({ data });
        const table = await this.prisma.table.findUnique({
            where: { id: data.tableId },
            include: { kitchen: { include: { managerKitchens: { include: { user: true } } } } }
        });
        if (table && table.kitchen) {
            const kitchenName = table.kitchen.name;
            const tableName = table.tableName;
            const managers = table.kitchen.managerKitchens
                .map(mk => mk.user)
                .filter(u => u.isActive && u.telegramChatId);
            const admins = await this.prisma.user.findMany({
                where: { role: 'ADMIN', isActive: true, telegramChatId: { not: null } }
            });
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
    findAll(tableId, user) {
        const whereClause = {};
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
    findOne(id) {
        return this.prisma.evaluation.findUnique({ where: { id }, include: { table: true } });
    }
    remove(id) {
        return this.prisma.evaluation.delete({ where: { id } });
    }
};
exports.EvaluationsService = EvaluationsService;
exports.EvaluationsService = EvaluationsService = EvaluationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        telegram_service_1.TelegramService])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map