import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(userId: string, dto: CreateTaskDto) {
    const project = await this.projectsService.findOwnedProject(
      dto.project,
      userId,
    );

    if (!project) {
      throw new ForbiddenException('Project not found');
    }

    return this.taskModel.create({
      ...dto,
      owner: userId,
    });
  }

  findAll(userId: string) {
    return this.taskModel
      .find({
        owner: userId,
      })
      .populate('project', 'title');
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndUpdate(
      {
        _id: id,
        owner: userId,
      },
      dto,
      {
        new: true,
      },
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string, userId: string) {
    const task = await this.taskModel.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return {
      message: 'Task deleted successfully',
    };
  }
}