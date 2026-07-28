import { TablesService } from './tables.service';
import { Prisma } from '@prisma/client';
export declare class TablesController {
    private readonly tablesService;
    constructor(tablesService: TablesService);
    findByToken(token: string): Prisma.Prisma__TableClient<({
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
    create(createTableDto: Omit<Prisma.TableUncheckedCreateInput, 'qrToken'>): Promise<{
        id: number;
        kitchenId: number;
        tableName: string;
        qrToken: string;
    }>;
    findAll(kitchenId: string | undefined, req: any): Promise<{
        id: number;
        kitchenId: number;
        tableName: string;
        qrToken: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        kitchenId: number;
        tableName: string;
        qrToken: string;
    } | null>;
    update(id: string, updateTableDto: Prisma.TableUpdateInput): Promise<{
        id: number;
        kitchenId: number;
        tableName: string;
        qrToken: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        kitchenId: number;
        tableName: string;
        qrToken: string;
    }>;
}
