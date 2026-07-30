import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  // Public endpoint for submitting evaluation
  @Post()
  create(@Body() createEvaluationDto: Prisma.EvaluationUncheckedCreateInput) {
    return this.evaluationsService.create(createEvaluationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get()
  findAll(
    @Query('tableId') tableId: string | undefined,
    @Query('kitchenId') kitchenId: string | undefined,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
    @Query('page') page: string | undefined,
    @Query('limit') limit: string | undefined,
    @Request() req: any
  ) {
    return this.evaluationsService.findAll({
      tableId: tableId ? +tableId : undefined,
      kitchenId: kitchenId ? +kitchenId : undefined,
      startDate,
      endDate,
      page: page ? +page : undefined,
      limit: limit ? +limit : undefined,
      user: req.user
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationsService.remove(+id);
  }
}
