import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { Consultation } from './entities/consultation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports:[TypeOrmModule.forFeature([Consultation])],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
