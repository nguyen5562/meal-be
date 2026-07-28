import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { KitchensService } from './kitchens.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('kitchens')
export class KitchensController {
  constructor(private readonly kitchensService: KitchensService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createKitchenDto: Prisma.KitchenCreateInput) {
    return this.kitchensService.create(createKitchenDto);
  }

  @Roles('ADMIN', 'MANAGER')
  @Get()
  findAll() {
    return this.kitchensService.findAll();
  }

  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchensService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitchenDto: Prisma.KitchenUpdateInput) {
    return this.kitchensService.update(+id, updateKitchenDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitchensService.remove(+id);
  }
}
