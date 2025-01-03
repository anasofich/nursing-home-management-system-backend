import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://anasofich:NursingDatabase@nursing-home-management.hlxly.mongodb.net/nursing-home-management-system?retryWrites=true&w=majority&appName=Nursing-home-management-platform',
    ), // Replace with your MongoDB URI
    UsersModule,
    ActivitiesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
