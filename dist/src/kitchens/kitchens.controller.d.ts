import { KitchensService } from './kitchens.service';
import { Prisma } from '@prisma/client';
export declare class KitchensController {
    private readonly kitchensService;
    constructor(kitchensService: KitchensService);
    create(createKitchenDto: Prisma.KitchenCreateInput): Promise<{
        name: string;
        id: number;
        isActive: boolean;
        location: string | null;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: number;
        isActive: boolean;
        location: string | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: number;
        isActive: boolean;
        location: string | null;
    } | null>;
    update(id: string, updateKitchenDto: Prisma.KitchenUpdateInput): Promise<{
        name: string;
        id: number;
        isActive: boolean;
        location: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        isActive: boolean;
        location: string | null;
    }>;
}
