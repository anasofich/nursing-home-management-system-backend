import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './schemas/activity.schema';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async create(
    @Body() createActivityDto: CreateActivityDto,
    @Query('userId') userId: string,
  ): Promise<Activity> {
    return this.activitiesService.create(createActivityDto, userId);
  }

  @Get()
  async findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Activity[]> {
    return this.activitiesService.findByUser(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: Partial<CreateActivityDto>,
  ): Promise<Activity> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.activitiesService.delete(id);
  }
}
