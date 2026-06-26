import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UserPayload } from '../auth/interfaces/user-payload.interface';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(
    @GetUser() user: UserPayload,
    @Body() dto: CreateTaskDto,
  ) {
    return this.tasksService.create(user.id, dto);
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    return this.tasksService.findAll(user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      id,
      user.id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ) {
    return this.tasksService.remove(
      id,
      user.id,
    );
  }
}