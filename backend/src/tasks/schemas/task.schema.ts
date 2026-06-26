import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    default: '',
  })
  description: string;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Prop({
    type: Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  project: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);