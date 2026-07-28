import { Context } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';
export declare class TelegramUpdate {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    onStart(ctx: Context): Promise<void>;
}
