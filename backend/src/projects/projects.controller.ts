import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import type { UserPayload } from '../auth/interfaces/user-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  create(
    @GetUser() user: UserPayload,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectsService.create(user.id, dto);
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ) {
    return this.projectsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
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
    return this.projectsService.remove(id, user.id);
  }
}