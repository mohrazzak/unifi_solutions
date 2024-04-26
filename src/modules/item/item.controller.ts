import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateItemDto } from './dto/create.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AppItemResponse, ReturnedItemResponse } from './response';
import { ItemService } from './item.service';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new magic item.',
    type: AppItemResponse,
  })
  async create(@Body() dto: CreateItemDto): Promise<ReturnedItemResponse> {
    const item = await this.itemService.create(dto);

    return {
      data: { item },
      message: 'Magic item created successfully.',
      statusCode: HttpStatus.CREATED,
    };
  }
}
