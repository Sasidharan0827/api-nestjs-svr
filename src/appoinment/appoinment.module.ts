import { Module } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { AppoinmentController } from './appoinment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appoinment } from './entities/appoinment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Appoinment])],
  controllers: [AppoinmentController],
  providers: [AppoinmentService],
})
export class AppoinmentModule {}
