import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { MoverService } from './mover.service';
import { CreateMoverDto } from './dto/create.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AppMoverResponse, ReturnedMoverResponse } from './response';

@Controller('mover')
@ApiTags('Mover')
export class MoverController {
  constructor(private readonly moverService: MoverService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create a Magic Mover.',
    type: AppMoverResponse,
  })
  async create(@Body() dto: CreateMoverDto): Promise<ReturnedMoverResponse> {
    const mover = await this.moverService.create(dto);

    return {
      data: { mover },
      message: 'Magic mover created successfully.',
      statusCode: HttpStatus.CREATED,
    };
  }
}
