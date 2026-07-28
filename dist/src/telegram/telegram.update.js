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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TelegramUpdate_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let TelegramUpdate = TelegramUpdate_1 = class TelegramUpdate {
    prisma;
    logger = new common_1.Logger(TelegramUpdate_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onStart(ctx) {
        const payload = ctx.message?.text?.split(' ')[1];
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
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                await ctx.reply('Không tìm thấy tài khoản để liên kết.');
                return;
            }
            await this.prisma.user.update({
                where: { id: userId },
                data: { telegramChatId: chatId },
            });
            this.logger.log(`Linked User ${user.username} (ID: ${user.id}) with Telegram Chat ID: ${chatId}`);
            await ctx.reply(`✅ Liên kết thành công!\n\nTài khoản **${user.username}** của bạn đã được kết nối với Telegram. Hệ thống sẽ gửi thông báo (bữa ăn, đánh giá) trực tiếp vào đây.`, { parse_mode: 'Markdown' });
        }
        catch (error) {
            this.logger.error(`Error linking telegram account: ${error.message}`);
            await ctx.reply('Đã xảy ra lỗi trong quá trình liên kết. Vui lòng thử lại sau.');
        }
    }
};
exports.TelegramUpdate = TelegramUpdate;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onStart", null);
exports.TelegramUpdate = TelegramUpdate = TelegramUpdate_1 = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TelegramUpdate);
//# sourceMappingURL=telegram.update.js.map