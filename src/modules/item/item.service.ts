import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateItemDto) {
    const { name, weight } = dto;
    return await this.prisma.item.create({
      data: { name, weight },
    });
  }

  async validateItemsExist(itemIds: number[]): Promise<void> {
    // valid items are existing items AND not currently used in another mover
    const validItems = await this.prisma.item.count({
      where: {
        id: { in: itemIds },
        NOT: {
          MissionItem: {
            some: {
              Mission: { status: { not: 'DONE' } },
            },
          },
        },
      },
    });

    if (validItems !== itemIds.length) {
      throw new BadRequestException(
        'One or more items are either not found or currently in a non-completed mission.',
      );
    }
  }
}
