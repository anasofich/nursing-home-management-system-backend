import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ enum: UserRole, required: true })
  role: UserRole;

  @Prop({ type: [{ type: String, ref: 'Activity' }] }) // References Activities
  activities: string[];

  @Prop()
  photo: string;

  async comparePassword(inputPassword: string): Promise<boolean> {
    console.log('Input Password:', inputPassword);
    console.log('Stored Password Hash:', this.password); // Hashed password
    return bcrypt.compare(inputPassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
