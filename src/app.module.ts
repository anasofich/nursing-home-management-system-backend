import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nursing-home-management-system',
    ), // Replace with your MongoDB URI
    UsersModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
