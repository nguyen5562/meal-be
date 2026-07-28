import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KitchensModule } from './kitchens/kitchens.module';
import { TablesModule } from './tables/tables.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, KitchensModule, TablesModule, EvaluationsModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
