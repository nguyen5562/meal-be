import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: any): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        telegramChatId: string | null;
        createdAt: Date;
    }>;
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
    findOne(id: string): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        telegramChatId: string | null;
        createdAt: Date;
    } | null>;
    update(id: string, body: any): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        telegramChatId: string | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        username: string;
        password: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        telegramChatId: string | null;
        createdAt: Date;
    }>;
}
