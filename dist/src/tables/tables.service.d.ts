import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Table } from '@prisma/client';
export declare class TablesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<Prisma.TableUncheckedCreateInput, 'qrToken'>): Promise<Table>;
    findAll(kitchenId?: number, user?: any): Promise<Table[]>;
    findOne(id: number): Promise<Table | null>;
    findByToken(qrToken: string): Prisma.Prisma__TableClient<({
        kitchen: {
            name: string;
            id: number;
            isActive: boolean;
            location: string | null;
        };
    } & {
        id: number;
        kitchenId: number;
        tableName: string;
        qrToken: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, data: Prisma.TableUpdateInput): Promise<Table>;
    remove(id: number): Promise<Table>;
}
