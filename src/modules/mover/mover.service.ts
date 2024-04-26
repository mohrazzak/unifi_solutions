import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateMoverDto } from './dto/create.dto';
import { $Enums } from '@prisma/client';

@Injectable()
export class MoverService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMoverDto) {
    const { energy, weightLimit } = dto;

    return await this.prisma.mover.create({ data: { energy, weightLimit } });
  }

  async getMoverLatestStatus(moverId: number) {
    const mission = await this.prisma.mission.findFirst({
      where: {
        moverId,
      },
      orderBy: { id: 'desc' },
      take: 1,
    });

    if (!mission) return $Enums.MissionStatus.RESTING;

    return mission.status;
  }
}
