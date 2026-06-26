import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsMongoId()
  project: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}