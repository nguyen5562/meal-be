import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: Prisma.UserCreateInput): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        telegramChatId: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        username: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        telegramChatId: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        telegramChatId: string | null;
        createdAt: Date;
    } | null>;
    update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        telegramChatId: string | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        telegramChatId: string | null;
        createdAt: Date;
    }>;
}
