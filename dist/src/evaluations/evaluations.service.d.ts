import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Evaluation } from '@prisma/client';
export declare class EvaluationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.EvaluationUncheckedCreateInput): Promise<Evaluation>;
    findAll(tableId?: number): Promise<Evaluation[]>;
    findOne(id: number): Promise<Evaluation | null>;
    remove(id: number): Promise<Evaluation>;
}
