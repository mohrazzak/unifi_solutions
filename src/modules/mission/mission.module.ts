import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { MoverModule } from '../mover/mover.module';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [ItemModule, MoverModule],
  providers: [MissionService],
  controllers: [MissionController],
})
export class MissionModule {}
