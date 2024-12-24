import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
    userId: string,
  ): Promise<Activity> {
    const activity = new this.activityModel({
      ...createActivityDto,
      createdBy: userId,
    });
    await activity.save();

    // Update the user's activities list
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { activities: activity._id },
    });

    return activity;
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async findOne(id: string): Promise<Activity> {
    return this.activityModel.findById(id).exec();
  }

  /* async findByUser(userId: string): Promise<Activity[]> {
    return this.activityModel.find({ createdBy: userId }).exec();
  } */

  async findByUser(userId: string): Promise<Activity[]> {
    return this.activityModel
      .find({ createdBy: new mongoose.Types.ObjectId(userId) }) // Cast userId to ObjectId
      .exec();
  }

  async update(
    id: string,
    updateActivityDto: Partial<CreateActivityDto>,
  ): Promise<Activity> {
    return this.activityModel
      .findByIdAndUpdate(id, updateActivityDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.activityModel.findByIdAndDelete(id).exec();
  }
}
