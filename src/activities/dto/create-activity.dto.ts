import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ActivityStatus } from '../schemas/activity.schema';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  notes: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsEnum(ActivityStatus)
  status: ActivityStatus;
}
