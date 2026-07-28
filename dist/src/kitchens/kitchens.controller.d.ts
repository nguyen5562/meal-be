import { KitchensService } from './kitchens.service';
import { Prisma } from '@prisma/client';
export declare class KitchensController {
    private readonly kitchensService;
    constructor(kitchensService: KitchensService);
    create(createKitchenDto: Prisma.KitchenCreateInput): Promise<{
        name: string;
        id: number;
        location: string | null;
        isActive: boolean;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: number;
        location: string | null;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: number;
        location: string | null;
        isActive: boolean;
    } | null>;
    update(id: string, updateKitchenDto: Prisma.KitchenUpdateInput): Promise<{
        name: string;
        id: number;
        location: string | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        location: string | null;
        isActive: boolean;
    }>;
}
