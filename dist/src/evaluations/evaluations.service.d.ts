import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Evaluation } from '@prisma/client';
import { TelegramService } from '../telegram/telegram.service';
export declare class EvaluationsService {
    private prisma;
    private telegramService;
    private readonly logger;
    constructor(prisma: PrismaService, telegramService: TelegramService);
    create(data: Prisma.EvaluationUncheckedCreateInput): Promise<Evaluation>;
    findAll(tableId?: number, user?: any): Promise<Evaluation[]>;
    findOne(id: number): Promise<Evaluation | null>;
    remove(id: number): Promise<Evaluation>;
}
