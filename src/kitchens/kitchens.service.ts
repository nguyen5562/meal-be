import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Kitchen } from '@prisma/client';

@Injectable()
export class KitchensService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.KitchenCreateInput): Promise<Kitchen> {
    return this.prisma.kitchen.create({ data });
  }

  findAll(user?: any): Promise<Kitchen[]> {
    if (user && user.role === 'MANAGER') {
      return this.prisma.kitchen.findMany({
        where: { managerKitchens: { some: { userId: user.sub } } }
      });
    }
    return this.prisma.kitchen.findMany();
  }

  findOne(id: number): Promise<Kitchen | null> {
    return this.prisma.kitchen.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.KitchenUpdateInput): Promise<Kitchen> {
    return this.prisma.kitchen.update({ where: { id }, data });
  }

  remove(id: number): Promise<Kitchen> {
    return this.prisma.kitchen.delete({ where: { id } });
  }
}
