import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<User | null>;
    create(data: any, kitchenIds?: number[]): Promise<User>;
    findAll(): Promise<{
        id: number;
        username: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        telegramChatId: string | null;
        createdAt: Date;
        managerKitchens: {
            kitchen: {
                name: string;
                id: number;
            };
        }[];
    }[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, data: any, kitchenIds?: number[]): Promise<User>;
    remove(id: number): Promise<User>;
}
