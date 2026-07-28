import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Table } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  create(data: Omit<Prisma.TableUncheckedCreateInput, 'qrToken'>): Promise<Table> {
    const qrToken = uuidv4();
    return this.prisma.table.create({
      data: { ...data, qrToken },
    });
  }

  findAll(kitchenId?: number, user?: any): Promise<Table[]> {
    const whereClause: any = {};
    if (kitchenId) {
      whereClause.kitchenId = kitchenId;
    }
    if (user && user.role === 'MANAGER') {
      whereClause.kitchen = { managerKitchens: { some: { userId: user.sub } } };
    }
    
    return this.prisma.table.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: { kitchen: true }
    });
  }

  findOne(id: number): Promise<Table | null> {
    return this.prisma.table.findUnique({ where: { id } });
  }

  findByToken(qrToken: string) {
    return this.prisma.table.findUnique({
      where: { qrToken },
      include: { kitchen: true }
    });
  }

  update(id: number, data: Prisma.TableUpdateInput): Promise<Table> {
    return this.prisma.table.update({ where: { id }, data });
  }

  remove(id: number): Promise<Table> {
    return this.prisma.table.delete({ where: { id } });
  }
}
