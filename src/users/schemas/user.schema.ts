import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  STAFF = 'staff',
  RESIDENT = 'resident',
  FAMILY_MEMBER = 'family_member',
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ enum: UserRole, required: true })
  role: UserRole;

  @Prop({ type: [{ type: String, ref: 'Activity' }] }) // References Activities
  activities: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
