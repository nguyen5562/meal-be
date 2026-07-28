import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Kitchen } from '@prisma/client';
export declare class KitchensService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.KitchenCreateInput): Promise<Kitchen>;
    findAll(): Promise<Kitchen[]>;
    findOne(id: number): Promise<Kitchen | null>;
    update(id: number, data: Prisma.KitchenUpdateInput): Promise<Kitchen>;
    remove(id: number): Promise<Kitchen>;
}
