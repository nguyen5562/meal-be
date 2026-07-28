import { EvaluationsService } from './evaluations.service';
import { Prisma } from '@prisma/client';
export declare class EvaluationsController {
    private readonly evaluationsService;
    constructor(evaluationsService: EvaluationsService);
    create(createEvaluationDto: Prisma.EvaluationUncheckedCreateInput): Promise<{
        id: number;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
        createdAt: Date;
    }>;
    findAll(tableId: string | undefined, req: any): Promise<{
        id: number;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
        createdAt: Date;
    } | null>;
    remove(id: string): Promise<{
        id: number;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
        createdAt: Date;
    }>;
}
