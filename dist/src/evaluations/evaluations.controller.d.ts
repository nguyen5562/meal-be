import { EvaluationsService } from './evaluations.service';
import { Prisma } from '@prisma/client';
export declare class EvaluationsController {
    private readonly evaluationsService;
    constructor(evaluationsService: EvaluationsService);
    create(createEvaluationDto: Prisma.EvaluationUncheckedCreateInput): Promise<{
        id: number;
        createdAt: Date;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
    }>;
    findAll(tableId: string | undefined, req: any): Promise<{
        id: number;
        createdAt: Date;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
    } | null>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        tableId: number;
        evaluatorName: string;
        unit: string;
        rating: number;
        feedback: string | null;
    }>;
}
