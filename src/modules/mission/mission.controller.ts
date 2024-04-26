import { Body, Controller, Get, HttpStatus, Patch, Post } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StartMissionDto } from './dto/start.dto';
import {
  AppMissionScoreboardResponse,
  ReturnedMissionScoreboardResponse,
} from './response';
import { AppResponse } from 'src/shared';

@Controller('mission')
@ApiTags('Mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post('load')
  @ApiCreatedResponse({
    description: 'Load a mover with items.',
    type: AppResponse,
  })
  async load(@Body() dto: CreateMissionDto) {
    await this.missionService.load(dto.items, dto.moverId);

    return {
      message: 'Magic mover loaded items successfully.',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('start')
  @ApiOkResponse({
    description: 'Start a mover mission.',
    type: AppResponse,
  })
  async start(@Body() dto: StartMissionDto) {
    await this.missionService.start(dto.moverId);

    return {
      message: 'Magic mover started successfully.',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('un-load')
  @ApiOkResponse({
    description: 'Un load a mover from items.',
    type: AppResponse,
  })
  async unLoad(@Body() dto: StartMissionDto) {
    await this.missionService.unLoad(dto.moverId);

    return {
      message: 'Magic mover un loaded successfully.',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('scoreboard')
  @ApiOkResponse({
    description: 'Get top 10 movers by completed missions.',
    type: AppMissionScoreboardResponse,
  })
  async scoreboard(): Promise<ReturnedMissionScoreboardResponse> {
    const scoreboard = await this.missionService.getMostCompletedMissions();

    return {
      data: { scoreboard },
      message: 'Scoreboard calculated successfully.',
      statusCode: HttpStatus.CREATED,
    };
  }
}
