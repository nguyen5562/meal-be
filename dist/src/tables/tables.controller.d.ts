import { TablesService } from './tables.service';
import { Prisma } from '@prisma/client';
export declare class TablesController {
    private readonly tablesService;
    constructor(tablesService: TablesService);
    findByToken(token: string): Prisma.Prisma__TableClient<({
        kitchen: {
            id: number;
            name: string;
            location: string | null;
            isActive: boolean;
        };
    } & {
        id: number;
        qrToken: string;
        kitchenId: number;
        tableName: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    create(createTableDto: Omit<Prisma.TableUncheckedCreateInput, 'qrToken'>): Promise<{
        id: number;
        qrToken: string;
        kitchenId: number;
        tableName: string;
    }>;
    findAll(kitchenId: string | undefined, req: any): Promise<{
        id: number;
        qrToken: string;
        kitchenId: number;
        tableName: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        qrToken: string;
        kitchenId: number;
        tableName: string;
    } | null>;
    update(id: string, updateTableDto: Prisma.TableUpdateInput): Promise<{
        id: number;
        qrToken: string;
        kitchenId: number;
        tableName: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        qrToken: string;
        kitchenId: number;
        tableName: string;
    }>;
}
