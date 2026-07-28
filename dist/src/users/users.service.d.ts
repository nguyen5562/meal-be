import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    findAll(): Promise<{
        id: number;
        username: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        telegramChatId: string | null;
        createdAt: Date;
    }[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
    remove(id: number): Promise<User>;
}
