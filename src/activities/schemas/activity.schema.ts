import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }) // Use ObjectId
  createdBy: mongoose.Schema.Types.ObjectId;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
