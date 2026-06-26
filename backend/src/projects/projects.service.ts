import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  create(userId: string, dto: CreateProjectDto) {
    return this.projectModel.create({
      ...dto,
      owner: userId,
    });
  }

  findAll(userId: string) {
    return this.projectModel.find({
      owner: userId,
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.projectModel.findOne({
      _id: id,
      owner: userId,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(
        id: string,
        userId: string,
        dto: UpdateProjectDto,
        ) {
    const project = await this.projectModel.findOneAndUpdate(
      {
        _id: id,
        owner: userId,
      },
      dto,
      {
        new: true,
      },
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async remove(id: string, userId: string) {
    const project = await this.projectModel.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return {
      message: 'Project deleted successfully',
    };
  }
}