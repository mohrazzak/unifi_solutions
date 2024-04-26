import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { EnvModule } from './env/env.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoverModule } from './mover/mover.module';
import { MissionController } from './mission/mission.controller';
import { MissionService } from './mission/mission.service';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [PrismaModule, ItemModule, EnvModule, MoverModule, MissionModule],
  providers: [MissionService],
  controllers: [MissionController],
})
export class ModulesModule {}
