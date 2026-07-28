import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Evaluation } from '@prisma/client';

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EvaluationUncheckedCreateInput): Promise<Evaluation> {
    return this.prisma.evaluation.create({ data });
  }

  findAll(tableId?: number): Promise<Evaluation[]> {
    return this.prisma.evaluation.findMany({
      where: tableId ? { tableId } : undefined,
      include: { table: true }
    });
  }

  findOne(id: number): Promise<Evaluation | null> {
    return this.prisma.evaluation.findUnique({ where: { id }, include: { table: true } });
  }

  remove(id: number): Promise<Evaluation> {
    return this.prisma.evaluation.delete({ where: { id } });
  }
}
