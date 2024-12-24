import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

export enum ActivityStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Schema()
export class Activity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  date: string;

  @Prop()
  notes: string;

  @Prop({ enum: ActivityStatus, default: ActivityStatus.PENDING })
  status: ActivityStatus;

  @Prop({ required: true })
  time: string;

  @Prop({ type: String, ref: 'User', required: true }) // Links to a User
  createdBy: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
