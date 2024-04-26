import { BadRequestException, Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { ItemService } from 'src/modules/item/item.service';
import { MoverService } from 'src/modules/mover/mover.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class MissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly moverService: MoverService,
    private readonly itemService: ItemService,
  ) {}

  async load(items: number[], moverId: number) {
    await this.validateMissionStatus(moverId, $Enums.MissionStatus.DONE);

    // Fetch mover details
    const mover = await this.prisma.mover.findUnique({
      where: { id: moverId },
    });

    if (!mover) throw new BadRequestException('Mover not found.');

    // Ensure unique item IDs (Set removes duplicates)
    const uniqueItems = new Set(items);

    // Validate items existence
    await this.itemService.validateItemsExist(Array.from(uniqueItems));

    // Fetch item details with weights
    const itemsWithWeight = await this.prisma.item.findMany({
      where: { id: { in: Array.from(uniqueItems) } },
      select: { id: true, weight: true },
    });

    // Calculate total weight from items
    const totalWeight = itemsWithWeight.reduce(
      (acc, item) => acc + item.weight,
      0,
    );

    // Check if mover energy and weight limits are sufficient
    if (mover.energy < uniqueItems.size || totalWeight > mover.weightLimit) {
      throw new BadRequestException(
        `Mover does not have enough energy or weight capacity. Energy: ${mover.energy}, Required: ${items.length}. Weight Limit: ${mover.weightLimit}, Total Weight: ${totalWeight}`,
      );
    }

    // Create mission after validation
    return await this.prisma.mission.create({
      data: {
        MissionItem: {
          create: itemsWithWeight.map((item) => ({
            Item: { connect: { id: item.id } },
          })),
        },
        Mover: { connect: { id: moverId } },
      },
      select: { id: true },
    });
  }

  async start(moverId: number) {
    await this.validateMissionStatus(moverId, 'LOADING');

    // I've used update many here to come over an issue which is a mission is not unique by moverId - status and it is handled by logic
    const mission = await this.prisma.mission.updateMany({
      data: {
        status: 'BUSY', // on a mission
      },
      where: { moverId, status: 'LOADING' },
    });

    if (mission.count === 0)
      throw new BadRequestException('Error, Mission not started.');

    return true;
  }

  async unLoad(moverId: number) {
    await this.validateMissionStatus(moverId, 'BUSY');

    const mission = await this.prisma.mission.updateMany({
      data: {
        status: 'DONE',
      },
      where: {
        moverId,
        status: 'BUSY', // on a mission
      },
    });

    if (mission.count === 0)
      throw new BadRequestException('Error, Mover un load failed.');

    return mission;
  }

  async getMostCompletedMissions(): Promise<
    { moverId: number; completedMissions: number }[]
  > {
    // count completed missions per mover
    const completedMissions = await this.prisma.mission.groupBy({
      where: { status: 'DONE' },
      by: ['moverId'],
      _count: {
        id: true,
      },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });
    // Convert results to desired format
    return completedMissions.map((mission) => ({
      moverId: mission.moverId,
      completedMissions: mission._count.id ?? 0,
    }));
  }

  private async validateMissionStatus(
    moverId: number,
    expectedStatus: $Enums.MissionStatus,
  ): Promise<void> {
    const currentStatus = await this.moverService.getMoverLatestStatus(moverId);

    // Consider Resting as okay to be loaded since it doesn't have any mission yet
    if (currentStatus === 'RESTING') return;

    const errorMsg = this.getErrorMessage(expectedStatus, currentStatus);

    if (currentStatus !== expectedStatus) {
      throw new BadRequestException(errorMsg);
    }
  }

  private getErrorMessage(
    expectedStatus: $Enums.MissionStatus,
    currentStatus: string,
  ) {
    const invalidStartMessage =
      currentStatus === $Enums.MissionStatus.LOADING
        ? 'Mover already loaded.'
        : 'Mover not started yet.';
    const invalidUnloadMessage =
      currentStatus === $Enums.MissionStatus.BUSY
        ? 'Mover already started.'
        : 'Mover not loaded yet.';

    switch (expectedStatus) {
      case $Enums.MissionStatus.DONE:
        return currentStatus === $Enums.MissionStatus.LOADING
          ? 'Mover already loaded.'
          : 'Mover already started.';
      case $Enums.MissionStatus.BUSY:
        return invalidStartMessage;
      case $Enums.MissionStatus.LOADING:
        return invalidUnloadMessage;
      default:
        return 'Invalid mission action';
    }
  }
}
