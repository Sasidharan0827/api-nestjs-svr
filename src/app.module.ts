import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { register } from 'module';
import { SignUpDto } from './auth/dto/auth.dto';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.gaurd.';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/entities/doctor.entity';
import { AppoinmentModule } from './appoinment/appoinment.module';
import { Appoinment } from './appoinment/entities/appoinment.entity';
import { ConsultationModule } from './consultation/consultation.module';
import { Consultation } from './consultation/entities/consultation.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { UploadImagesModule } from './upload-images/upload-images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3005,
      username: 'admin',
      password: 'admin123',
      database: 'blog',
      entities: [User, Doctor, Appoinment, Consultation, Admin],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    JwtModule.register({ secret: 'secret' }),
    DoctorModule,
    AppoinmentModule,
    ConsultationModule,
    AdminModule,
    UploadImagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
