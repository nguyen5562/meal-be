import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
  
  async create(data: any, kitchenIds?: number[]): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return this.prisma.user.create({
      data: { 
        ...data, 
        password: hashedPassword,
        managerKitchens: kitchenIds ? {
          create: kitchenIds.map(kid => ({ kitchenId: kid }))
        } : undefined
      },
    });
  }
  
  async findAll() {
    return this.prisma.user.findMany({ 
      select: { 
        id: true, 
        username: true, 
        fullName: true, 
        role: true, 
        isActive: true, 
        telegramChatId: true, 
        createdAt: true,
        managerKitchens: {
          select: {
            kitchen: {
              select: { id: true, name: true }
            }
          }
        }
      } 
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: any, kitchenIds?: number[]): Promise<User> {
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password as string, salt);
    }
    return this.prisma.user.update({ 
      where: { id }, 
      data: {
        ...data,
        managerKitchens: kitchenIds ? {
          deleteMany: {},
          create: kitchenIds.map(kid => ({ kitchenId: kid }))
        } : undefined
      } 
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
